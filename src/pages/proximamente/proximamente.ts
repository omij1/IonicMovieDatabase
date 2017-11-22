import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {LoadingController} from 'ionic-angular';
import {DetallePeliculaPage} from '../detalle-pelicula/detalle-pelicula';

/**
 * Generated class for the ProximamentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-proximamente',
  templateUrl: 'proximamente.html',
})
export class ProximamentePage {

	paginaAct: number = 1;
	totalPages: number = 0;
	peliculas: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public movieDatabase: MovieDatabaseProvider, public loadingCtrl: LoadingController) {
  
  	const loading = this.presentLoadingCustom();
  	this.getProximasPeliculas().then(()=>{
  		loading.dismiss();
  	});
  }

/**
* Función que se comunica con el provider y obtiene las próximas películas que se van a
* estrenar en el cine.
*/
getProximasPeliculas(){
	return new Promise(resolve=>{
		this.movieDatabase.getProximasPeliculas(this.paginaAct)
	.then(res => {

		this.paginaAct = res["page"];
		this.totalPages = res["total_pages"];
		res["results"].forEach(pelicula => {
			if (pelicula["overview"] === "") {
				pelicula["overview"] = "Descripción no disponible";
			}
			if (pelicula["poster_path"] === null) {
				pelicula["poster_path"] = 'assets/imgs/no_imagen.jpeg';
			}
			else{
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
			}
			this.peliculas.push(pelicula);
		});

	});
	resolve(true);
	});
}

/**
* Función que se ejecuta cuando el usuario selecciona una película y que abre
* automáticamente la página donde se muestran los detalles de dicha película.
*/
detallesPelicula(id){
	const loading = this.presentLoadingCustom();
	this.movieDatabase.getDetallesPelicula(id)
	.then(res => {
		loading.dismiss();
		this.navCtrl.push(DetallePeliculaPage,{detallePelicula: res});
	});
}  

/**
* Función que muestra la animación de carga.
*/
presentLoadingCustom() {
	  const loading = this.loadingCtrl.create({
	    content:  `
	      <div class="custom-spinner-container">
	        <div class="custom-spinner-box">
	        <ion-spinner name="bubbles">Cargando...</ion-spinner>
	        </div>
	      </div>`,
	    duration: 5500
	  });

	  loading.present();
	  return loading;
}

/**
* Scroll infinito que carga nuevos datos.
*/
doInfinite(infiniteScroll){
	if (this.paginaAct < this.totalPages) {
		this.paginaAct += this.paginaAct;
		this.getProximasPeliculas().then(()=>{
			infiniteScroll.complete();
		});
	}
	else{
		infiniteScroll.complete();
	}
}
}

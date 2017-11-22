import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {LoadingController} from 'ionic-angular';
import {DetalleSeriePage} from '../../pages/detalle-serie/detalle-serie';

/**
 * Generated class for the EnTelevisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-en-television',
  templateUrl: 'en-television.html',
})
export class EnTelevisionPage {

	paginaAct: number = 1;
	totalPages: number = 0;
	series: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public movieDatabase: MovieDatabaseProvider, public loadingCtrl: LoadingController) {
  	
  	const loading = this.presentLoadingCustom();
  	this.getEnTelevision().then(()=>{
  		loading.dismiss();
  	});
  }

/**
* Función que se comunica con el provider para obtener las series que están en televisión.
*/
getEnTelevision(){
  	return new Promise(resolve=>{
  		this.movieDatabase.getSeriesEnEmision(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(serie => {
				if (serie["overview"] === null || serie["overview"] === "") {
					serie["overview"] = "Descripción no disponible";
				}
				if (serie["poster_path"] === null) {
					serie["poster_path"] = 'assets/imgs/no_imagen.jpeg';
				}
				else{
					serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
				}
				serie["first_air_date"] = serie["first_air_date"].slice(0,4);
				this.series.push(serie);
			});
		});
		resolve(true);
  	});
}

/**
* Función que se ejecuta cuando el usuario selecciona una serie.
*/
detallesSerie(id){
	const loading = this.presentLoadingCustom();
	this.movieDatabase.getDetallesSerie(id)
	.then(res => {
		loading.dismiss();
		this.navCtrl.push(DetalleSeriePage,{detalleSerie: res});
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
			this.paginaAct += 1;
			this.getEnTelevision().then(()=>{
				infiniteScroll.complete();
			});
		}
		else{
			infiniteScroll.complete();
		}
	}
}

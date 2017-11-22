import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {DetallePeliculaPage} from '../../pages/detalle-pelicula/detalle-pelicula';

/**
 * Generated class for the FiltroPeliculasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-filtro-peliculas',
  templateUrl: 'filtro-peliculas.html',
})
export class FiltroPeliculasPage {

	peliculas: Array<any> = [];
	genero: number;
	paginaAct: number = 1;
	totalPages: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public movieDatabase: MovieDatabaseProvider) {
  
	this.genero = navParams.data.filtroPelicula;  
	this.getPeliculas();
  }

/**
* Función que se comunica con el provider y obtiene las películas del género seleccionado.
*/
getPeliculas(){
  	return new Promise(resolve =>{
  		this.movieDatabase.peliculasPorCategoria(this.genero["id"],this.paginaAct)
  		.then(res =>{
  			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
  			res["results"].forEach(pelicula =>{
  				if (pelicula["overview"] === "") {
					pelicula["overview"] = "Descripción no disponible";
				}
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
				pelicula["release_date"] = pelicula["release_date"].slice(0,4);
				this.peliculas.push(pelicula);
  			});
  		});
  	});
  }

/**
* Función que se ejecuta cuando el usuario selecciona una película y
* abre automáticamente la página de detalles de esa película.
*/
detallesPelicula(id: number){
  	this.movieDatabase.getDetallesPelicula(id)
		.then(res => {
			this.navCtrl.push(DetallePeliculaPage,{detallePelicula: res});
	});
  }

/**
* Scroll infinito que carga nuevos datos.
*/
doInfinite(infiniteScroll){
	if (this.paginaAct < this.totalPages) {
		this.paginaAct += 1;
		this.getPeliculas().then(()=>{
			infiniteScroll.complete();
		});
	}
	else{
		infiniteScroll.complete();
	}
}
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {FiltroPeliculasPage} from '../../pages/filtro-peliculas/filtro-peliculas';
import {FiltroSeriesPage} from '../../pages/filtro-series/filtro-series';
/**
 * Generated class for the FiltroCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-filtro-categorias',
  templateUrl: 'filtro-categorias.html',
})
export class FiltroCategoriasPage {

	categoria: string = "peliculas";
	generosPeliculas: Array<Object> = [];
	generosSeries: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public loadingCtrl: LoadingController, public movieDatabase: MovieDatabaseProvider) {

  }

  /**
  * Función que se ejecuta cuando carga la vista y que invoca a 
  * la función encargada de obtener los géneros de las películas.
  */
  ionViewDidLoad() {
  	const loading = this.presentLoadingCustom();
	  	this.obtenerGenerosPeliculas().then(()=>{
	  		loading.dismiss();
	  	});
  }

  /**
  * Función que se invoca cuando el usuario selecciona el segment películas
  * y que invoca a la función que obtiene los géneros de las películas.
  */
  verGenerosPeliculas(){
  	this.obtenerGenerosPeliculas();
  	this.categoria = "peliculas";
  }

  /**
  * Función que se invoca cuando el usuario selecciona el segment series
  * y que invoca a la función que obtiene los géneros de las series.
  */  
  verGenerosSeries(){
  	this.obtenerGenerosSeries();
  	this.categoria = "series";
  }

  /**
  * Función que se comunica con el provider y obtiene los géneros de las 
  * películas.
  */
  obtenerGenerosPeliculas(){
  	return new Promise (resolve =>{

  		this.movieDatabase.getGenerosPeliculas()
			.then(res => {
				this.generosPeliculas = [];
				res["genres"].forEach(genero => {
					this.generosPeliculas.push(genero);
				});
			});

		resolve(true);
  	});
  }

  /**
  * Función que llama a la página que muestra todas las películas del género
  * seleccionado.
  */
  verPeliculas(genero){
    this.navCtrl.push(FiltroPeliculasPage,{filtroPelicula: genero});
  }

  /**
  * Función que se comunica con el provider y obtiene los géneros de las 
  * series.
  */
  obtenerGenerosSeries(){
  	return new Promise(resolve => {

  		this.movieDatabase.getGenerosSeries()
  		.then(res => {
  			this.generosSeries = [];
  			res["genres"].forEach(genero => {
  				this.generosSeries.push(genero);
  			});
  		});
  	});
  }

  /**
  * Función que llama a la página que muestra todas las series del género
  * seleccionado.
  */
  verSeries(genero){
    this.navCtrl.push(FiltroSeriesPage,{filtroSerie: genero});
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

}

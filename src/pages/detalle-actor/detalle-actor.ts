import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {DetallePeliculaPage} from '../detalle-pelicula/detalle-pelicula';
import {DetalleSeriePage} from '../../pages/detalle-serie/detalle-serie';

/**
 * Generated class for the DetalleActorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-detalle-actor',
  templateUrl: 'detalle-actor.html',
})
export class DetalleActorPage {

	retrato: any = null;
	actorId: any = null;
	info: any = null;
	actuaciones: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public movieDatabase: MovieDatabaseProvider, public loadingCtrl: LoadingController) {
  
  	this.retrato = navParams.data.detalleActor;
  	this.info = navParams.data.detalleInfo;
  	this.actorId = navParams.data.actorId;
  	this.getActuaciones();
  }

/**
* Función que se comunica con el provider y obtiene las actuaciones del actor correspondiente.
*/
  getActuaciones(){
  	return new Promise(resolve => {
		this.movieDatabase.getActuacionesActor(this.actorId)
		.then(res => {

		res["cast"].forEach(act => {
			if (act["poster_path"] != null) {
				act["poster_path"] = 'https://image.tmdb.org/t/p/w500'+act["poster_path"];
			}
			else{
				act["poster_path"] = 'assets/imgs/no_imagen.jpeg';
			}
			
			this.actuaciones.push(act);
		});
	});
		resolve(true);
  	});
  }

  /**
  * Función que abre la página de detalle correspondiente dependiendo de si se selecciona una serie
  * o una película en las que actúa el actor de la vista.
  */
  detallesCredit(id,media){
  	if (media === "movie") {
  		this.movieDatabase.getDetallesPelicula(id)
		.then(res => {
			this.navCtrl.push(DetallePeliculaPage,{detallePelicula: res});
		});
  	}
  	else{
  		this.movieDatabase.getDetallesSerie(id)
		.then(res => {
			this.navCtrl.push(DetalleSeriePage,{detalleSerie: res});
		});
  	}
  }

}

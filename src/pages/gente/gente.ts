import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {DetalleActorPage} from '../../pages/detalle-actor/detalle-actor';

/**
 * Generated class for the GentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-gente',
  templateUrl: 'gente.html',
})
export class GentePage {

	gente :Array<Object> = [];
	auxiliar: Array<Object> = [];
	paginaAct: number = 1;
	pagAux: number = 1;
	totalPages: number = 0;
	auxTotal: number = 0;
	opcion: string = "";
	query: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public loadingCtrl: LoadingController,public movieDatabase: MovieDatabaseProvider,
  	public toastCtrl: ToastController) {
  
  	const loading = this.presentLoadingCustom();
	  	this.getGente().then(()=>{
	  		loading.dismiss();
	  	});	
  }

/**
* Función que se ejecuta cuando el usuario pulsa el botón de buscar.
*/
buscarActor(){
	this.guardarEstado();
	this.opcion = "busqueda";
	this.getActoresCandidatos();
}

/**
* Función que guarda los datos mostrados en la vista para poder volver a este estado.
*/
guardarEstado(){
	this.auxiliar = this.gente;
	this.auxTotal = this.totalPages;
	this.pagAux = this.paginaAct;
	this.resetPagina();
}

/**
* Función que prepara la vista para mostrar los resultados de la búsqueda.
*/
resetPagina(){
	this.gente = [];
	this.paginaAct = 1;
	this.totalPages = 0;
}

/**
* Función que se ejecuta cuando el usuario borra la búsqueda realizada y que permite volver al estado
* anterior de la misma.
*/
restaurarEstado(){
	if (this.auxiliar.length > 1){
		this.gente = this.auxiliar;
		this.paginaAct = this.pagAux;
		this.totalPages = this.auxTotal;
		this.auxiliar = [];
		this.pagAux = 1;
		this.auxTotal = 0;
	}
}

/**
* Función que se comunica con el provider y que se encarga de obtener los actores populares actualmente.
*/
getGente(){
	return new Promise(resolve => {
			this.movieDatabase.getGentePopular(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(gente => {
				gente["profile_path"] = 'https://image.tmdb.org/t/p/w500'+gente["profile_path"];
				this.gente.push(gente);
			});
		});
		resolve(true);
		});
}

/**
* Función que se encarga de buscar los actores que son candidatos de ser el resultado de la búsqueda del usuario.
*/
getActoresCandidatos(){
	return new Promise(resolve => {
			this.movieDatabase.buscarActor(this.query.toLowerCase(),this.paginaAct)
			.then(res => {

				if (res != null && res["total_results"] != 0) {
					
					this.paginaAct = res["page"];
					this.totalPages = res["total_pages"];
					res["results"].forEach(actor => {

						if (actor != null) {

							if (actor["profile_path"] != null) {
								actor["profile_path"] = 'https://image.tmdb.org/t/p/w500'+actor["profile_path"];
							}
							else{
								actor["profile_path"] = 'assets/imgs/no_imagen.jpeg';
							}

							this.gente.push(actor);
						}

					});
				}

				else {

					let toast = this.toastCtrl.create({
						message: 'No se han encontrado resultados',
						showCloseButton: true,
						position: 'top',
						closeButtonText: 'OK'
					});

					toast.onDidDismiss(()=>{
						this.restaurarEstado();
					});

					toast.present();
				}
			});
			resolve(true);
		});
}

/**
* Función que se ejecuta cuando el usuario selecciona un actor y que abre
* automáticamente la página donde se muestran los detalles de dicho actor.
*/
detallesPersona(item){
	const loading = this.presentLoadingCustom();
  	this.movieDatabase.getInformacionActor(item["id"])
	.then(res =>{
		if (res["place_of_birth"] === null) {
			res["place_of_birth"] = "No disponible";
		}
		if (res["deathday"] === null) {
			res["deathday"] = "No disponible";
		}
		loading.dismiss();
		this.navCtrl.push(DetalleActorPage,{detalleActor: item["profile_path"], actorId: item["id"], detalleInfo: res});
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
		switch (this.opcion) {
			case "busqueda":
				this.getActoresCandidatos().then(()=>{
					infiniteScroll.complete();
				});
			break;
			
			default:
				this.getGente().then(()=>{
				infiniteScroll.complete();
				});
			break;
		}
	}
	else{
		infiniteScroll.complete();
	}
}

}

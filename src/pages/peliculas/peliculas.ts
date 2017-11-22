import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {LoadingController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {DetallePeliculaPage} from '../detalle-pelicula/detalle-pelicula';
import {ToastController} from 'ionic-angular';


/**
 * Generated class for the PeliculasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-peliculas',
  templateUrl: 'peliculas.html',
})
export class PeliculasPage {

	peliculas :Array<Object> = [];
	auxiliar: Array<Object> = [];
	paginaAct: number = 1;
	pagAux: number = 1;
	totalPages: number = 0;
	auxTotal: number = 0;
	opcion: string = "";
	query: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public loadingCtrl: LoadingController,public movieDatabase: MovieDatabaseProvider,
  	public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController) {
  	
  		const loading = this.presentLoadingCustom();
	  	this.getPeliculas().then(()=>{
	  		loading.dismiss();
	  	});	

  }

/**
* Función que se ejecuta cuando el usuario pulsa el botón de buscar.
*/
buscarPelicula(){
	this.guardarEstado();
	this.opcion = "busqueda";
	this.getPeliculasCandidatas();
}

/**
* Función que guarda los datos mostrados en la vista para poder volver a este estado.
*/
guardarEstado(){
	this.auxiliar = this.peliculas;
	this.auxTotal = this.totalPages;
	this.pagAux = this.paginaAct;
	this.resetPagina();
}

/**
* Función que se ejecuta cuando el usuario borra la búsqueda realizada y que permite volver al estado
* anterior de la misma.
*/
restaurarEstado(){
	if (this.auxiliar.length > 1){
		this.peliculas = this.auxiliar;
		this.paginaAct = this.pagAux;
		this.totalPages = this.auxTotal;
		this.auxiliar = [];
		this.pagAux = 1;
		this.auxTotal = 0;
	}
}

/**
* Función que se encarga de comunicarse con el provider y obtener las películas más influyentes.
*/
getPeliculas(){
	return new Promise(resolve => {
		this.movieDatabase.getPeliculas(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(pelicula => {
				if (pelicula["overview"] === "") {
					pelicula["overview"] = "Descripción no disponible";
				}
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
				pelicula["release_date"] = pelicula["release_date"].slice(0,4);
				this.peliculas.push(pelicula);
			});

		});
		resolve(true);
	});
	
}

/**
* Función que se encarga de comunicarse con el provider y obtener las películas más populares.
*/
getPeliculasPopulares(){
	return new Promise(resolve => {
		this.movieDatabase.getPeliculasPopulares(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(pelicula => {
				if (pelicula["overview"] === "") {
					pelicula["overview"] = "Descripción no disponible";
				}
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
				pelicula["release_date"] = pelicula["release_date"].slice(0,4);
				this.peliculas.push(pelicula);
			});

		});
		resolve(true);
	});
}

/**
* Función que se encarga de comunicarse con el provider y obtener las películas mejor valoradas.
*/
getPeliculasMejorVal(){
	return new Promise(resolve => {
		this.movieDatabase.getPeliculasMejorValoradas(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(pelicula => {
				if (pelicula["overview"] === "") {
					pelicula["overview"] = "Descripción no disponible";
				}
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
				pelicula["release_date"] = pelicula["release_date"].slice(0,4);
				this.peliculas.push(pelicula);
			});

		});
		resolve(true);
	});
}

/**
* Función que se encarga de comunicarse con el provider y obtener las películas más taquilleras.
*/
getPeliculasMasTaquilleras(){
	return new Promise(resolve => {
		this.movieDatabase.getPeliculasMasTaquilleras(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(pelicula => {
				if (pelicula["overview"] === "") {
					pelicula["overview"] = "Descripción no disponible";
				}
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
				pelicula["release_date"] = pelicula["release_date"].slice(0,4);
				this.peliculas.push(pelicula);
			});

		});
		resolve(true);
	});
}

/**
* Función que se encarga de comunicarse con el provider y obtener las películas ordenadas por fecha ascendente.
*/
getPeliculasFechaAsc(){
	return new Promise(resolve => {
		this.movieDatabase.getPeliculasDateAsc(this.paginaAct)
		.then(res => {

			this.paginaAct = res["page"];
			this.totalPages = res["total_pages"];
			res["results"].forEach(pelicula => {
				if (pelicula["overview"] === "") {
					pelicula["overview"] = "Descripción no disponible";
				}
				pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
				pelicula["release_date"] = pelicula["release_date"].slice(0,4);
				this.peliculas.push(pelicula);
			});

		});
		resolve(true);
	});
}

/**
* Función que se encarga de buscar las películas que son candidatas de ser el resultado de la búsqueda del usuario.
*/
getPeliculasCandidatas(){
	return new Promise(resolve => {
			this.movieDatabase.buscarPelicula(this.query.toLowerCase(),this.paginaAct)
			.then(res => {

				if (res != null && res["total_results"] != 0) {
					
					this.paginaAct = res["page"];
					this.totalPages = res["total_pages"];
					res["results"].forEach(pelicula => {

						if (pelicula != null) {

							if (pelicula["overview"] === "") {
								pelicula["overview"] = "Descripción no disponible";
								}

							pelicula["poster_path"] = 'https://image.tmdb.org/t/p/w500'+pelicula["poster_path"];
							pelicula["release_date"] = pelicula["release_date"].slice(0,4);
							this.peliculas.push(pelicula);
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
* Función que muestra las opciones de visualización disponibles de las películas.
*/
mostrarOpciones(){
	let actionSheet = this.actionSheetCtrl.create({
		title: 'Elige una opción',
		buttons: [
		{
			text: 'Películas populares',
			handler: () => {
				this.resetPagina();
				this.opcion = "populares";
				this.getPeliculasPopulares();
				this.resetAux();
			}
		}
		,{
			text: 'Mejor valoradas',
			handler: () => {
				this.resetPagina();
				this.opcion = "mejor valoradas";
				this.getPeliculasMejorVal();
				this.resetAux();
			}
		}
		,{
			text: 'Más taquilleras',
			handler: () => {
				this.resetPagina();
				this.opcion = "más taquilleras";
				this.getPeliculasMasTaquilleras();
				this.resetAux();
			}
		}
		,{
			text: 'Mostrar por fecha de estreno(asc)',
			handler: () => {
				this.resetPagina();
				this.opcion = "fecha ascendente";
				this.getPeliculasFechaAsc();
				this.resetAux();
			}
		}
		,{
			text: 'Cancelar',
			role: 'cancel'
		}
		]
	});
	actionSheet.present();
}

/**
* Función que prepara la vista para mostrar los resultados de la búsqueda.
*/
resetPagina(){
	this.peliculas = [];
	this.paginaAct = 1;
	this.totalPages = 0;
}

/**
* Función que prepara la vista para mostrar el estado anterior tras una búsqueda.
*/
resetAux(){
	this.auxiliar = [];
	this.pagAux = 1;
	this.auxTotal = 0;
}

/**
* Scroll infinito que carga nuevos datos.
*/
doInfinite(infiniteScroll){
	if (this.paginaAct < this.totalPages) {
		this.paginaAct += 1;
		switch (this.opcion) {
			case "populares":
				this.getPeliculasPopulares().then(()=>{
					infiniteScroll.complete();
				});
				break;
			case "mejor valoradas":
				this.getPeliculasMejorVal().then(()=>{
					infiniteScroll.complete();
				});
				break;
			case "más taquilleras":
				this.getPeliculasMasTaquilleras().then(()=>{
					infiniteScroll.complete();
				});
				break;
			case "fecha ascendente":
				this.getPeliculasFechaAsc().then(()=>{
					infiniteScroll.complete();
				});
				break;
			case "busqueda":
				this.getPeliculasCandidatas().then(()=>{
					infiniteScroll.complete();
				});
				break;	
			default:
				this.getPeliculas().then(()=>{
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

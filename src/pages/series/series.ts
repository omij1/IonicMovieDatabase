import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {LoadingController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {DetalleSeriePage} from '../../pages/detalle-serie/detalle-serie';

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {

	series: Array<Object> = [];
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
		this.getSeries().then(()=>{
		  		loading.dismiss();
		  	});
  }

/**
* Función que se ejecuta cuando el usuario pulsa el botón de buscar.
*/
buscarSerie(){
	this.guardarEstado();
	this.opcion = "busqueda";
	this.getSeriesCandidatas();
}

/**
* Función que guarda los datos mostrados en la vista para poder volver a este estado.
*/
guardarEstado(){
	this.auxiliar = this.series;
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
		this.series = this.auxiliar;
		this.paginaAct = this.pagAux;
		this.totalPages = this.auxTotal;
		this.auxiliar = [];
		this.pagAux = 1;
		this.auxTotal = 0;
	}
}

/**
* Función que se encarga de comunicarse con el provider y obtener las series más influyentes.
*/
getSeries(){
	return new Promise(resolve => {
			this.movieDatabase.getSeries(this.paginaAct)
			.then(res => {

				this.paginaAct = res["page"];
				this.totalPages = res["total_pages"];
				res["results"].forEach(serie => {
					if (serie["overview"] === "") {
						serie["overview"] = "Descripción no disponible";
					}
					serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
					serie["first_air_date"] = serie["first_air_date"].slice(0,4);
					this.series.push(serie);
				});
			});
			resolve(true);
		});
}

/**
* Función que se encarga de comunicarse con el provider y obtener las series más populares.
*/
getSeriesPopulares(){
	return new Promise(resolve => {
			this.movieDatabase.getSeriesPopulares(this.paginaAct)
			.then(res => {

				this.paginaAct = res["page"];
				this.totalPages = res["total_pages"];
				res["results"].forEach(serie => {
					if (serie["overview"] === "") {
						serie["overview"] = "Descripción no disponible";
					}
					serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
					serie["first_air_date"] = serie["first_air_date"].slice(0,4);
					this.series.push(serie);
				});
			});
			resolve(true);
		});
}

/**
* Función que se encarga de comunicarse con el provider y obtener las series mejor valoradas.
*/
getSeriesMejorValoradas(){
	return new Promise(resolve => {
			this.movieDatabase.getSeriesMejorValoradas(this.paginaAct)
			.then(res => {

				this.paginaAct = res["page"];
				this.totalPages = res["total_pages"];
				res["results"].forEach(serie => {
					if (serie["overview"] === "") {
						serie["overview"] = "Descripción no disponible";
					}
					serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
					serie["first_air_date"] = serie["first_air_date"].slice(0,4);
					this.series.push(serie);
				});
			});
			resolve(true);
		});
}

/**
* Función que se encarga de comunicarse con el provider y obtener las series ordenadas por fecha ascendente.
*/
getSeriesFechaAsc(){
	return new Promise(resolve => {
			this.movieDatabase.getSeriesDateAsc(this.paginaAct)
			.then(res => {

				this.paginaAct = res["page"];
				this.totalPages = res["total_pages"];
				res["results"].forEach(serie => {

					if (serie != null) {

						if (serie["overview"] === "") {
						serie["overview"] = "Descripción no disponible";
						}
						serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
						serie["first_air_date"] = serie["first_air_date"].slice(0,4);
						this.series.push(serie);

					}

				});
			});
			resolve(true);
		});
}

/**
* Función que se encarga de buscar las series que son candidatas de ser el resultado de la búsqueda del usuario.
*/
getSeriesCandidatas(){
	return new Promise(resolve => {
			this.movieDatabase.buscarSerie(this.query.toLowerCase(),this.paginaAct)
			.then(res => {

				if (res != null && res["total_results"] != 0) {
					
					this.paginaAct = res["page"];
					this.totalPages = res["total_pages"];
					res["results"].forEach(serie => {

						if (serie != null) {

							if (serie["overview"] === "") {
								serie["overview"] = "Descripción no disponible";
								}

							serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
							serie["first_air_date"] = serie["first_air_date"].slice(0,4);
							this.series.push(serie);
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
* Función que se ejecuta cuando el usuario selecciona una serie y que abre
* automáticamente la página donde se muestran los detalles de dicha serie.
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
* Función que muestra las opciones de visualización disponibles de las series.
*/
mostrarOpciones(){
	let actionSheet = this.actionSheetCtrl.create({
		title: 'Elige una opción',
		buttons: [
		{
			text: 'Series populares',
			handler: () => {
				this.resetPagina();
				this.opcion = "populares";
				this.getSeriesPopulares();
				this.resetAux();
			}
		}
		,{
			text: 'Mejor valoradas',
			handler: () => {
				this.resetPagina();
				this.opcion = "mejor valoradas";
				this.getSeriesMejorValoradas();
				this.resetAux();
			}
		}
		,{
			text: 'Mostrar por fecha de estreno(asc)',
			handler: () => {
				this.resetPagina();
				this.opcion = "fecha ascendente";
				this.getSeriesFechaAsc();
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
	this.series = [];
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
			case "value":
				this.getSeriesPopulares().then(()=>{
					infiniteScroll.complete();
				});
				break;
			case "mejor valoradas":
				this.getSeriesMejorValoradas().then(()=>{
					infiniteScroll.complete();
				});
				break;	
			case "fecha ascendente":
				this.getSeriesFechaAsc().then(()=>{
					infiniteScroll.complete();
				});
				break;
			case "busqueda":
				this.getSeriesCandidatas().then(()=>{
					infiniteScroll.complete();
				});
				break;		
			default:
				this.getSeries().then(()=>{
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

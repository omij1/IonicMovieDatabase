import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {DetalleSeriePage} from '../../pages/detalle-serie/detalle-serie';
/**
 * Generated class for the FiltroSeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-filtro-series',
  templateUrl: 'filtro-series.html',
})
export class FiltroSeriesPage {

	series: Array<any> = [];
	genero: number;
	paginaAct: number = 1;
	totalPages: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public movieDatabase: MovieDatabaseProvider) {
 
  	this.genero = navParams.data.filtroSerie;  
	this.getSeries();
  }

/**
* Función que se comunica con el provider y obtiene las series del género seleccionado.
*/
getSeries(){
	return new Promise(resolve =>{
		this.movieDatabase.seriesPorCategoria(this.genero["id"],this.paginaAct)
		.then(res =>{
			this.paginaAct = res["page"];
		this.totalPages = res["total_pages"];
			res["results"].forEach(serie =>{
				if (serie["overview"] === "") {
				serie["overview"] = "Descripción no disponible";
			}
			serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+serie["poster_path"];
			serie["first_air_date"] = serie["first_air_date"].slice(0,4);
			this.series.push(serie);
			});
		});
	});
}

/**
* Función que se ejecuta cuando el usuario selecciona una serie y
* abre automáticamente la página de detalles de esa serie.
*/
detallesSerie(id: number){
	this.movieDatabase.getDetallesSerie(id)
	.then(res => {
		this.navCtrl.push(DetalleSeriePage,{detalleSerie: res});
	});
}

/**
* Scroll infinito que carga nuevos datos.
*/
doInfinite(infiniteScroll){
	if (this.paginaAct < this.totalPages) {
		this.paginaAct += 1;
		this.getSeries().then(()=>{
			infiniteScroll.complete();
		});
	}
	else{
		infiniteScroll.complete();
	}
}
}

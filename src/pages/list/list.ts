import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import {DetallePeliculaPage} from '../detalle-pelicula/detalle-pelicula';
import {DetalleSeriePage} from '../detalle-serie/detalle-serie';
import firebase from 'firebase';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  usuario: string;
  selectedItem: any;
  items: Array<Object>;
  pelis: firebase.database.Reference = 
     firebase.database().ref('/peliculas');
  series: firebase.database.Reference = 
     firebase.database().ref('/series');
  categoria: string = "peliculas";   

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public movieDatabase: MovieDatabaseProvider) {
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.usuario = user.uid;
      }
    });

    this.selectedItem = navParams.get('item');  
  }

/**
* Función que al cargar la vista llama a la función que obtiene las películas favoritas del
* usuario en firebase.
*/
ionViewDidLoad() {
  this.obtenerPeliculasFavoritas();
}

/**
* Función que se ejecuta al seleccionar películas en el segmento de la parte superior.
*/
verPeliculasFavoritas(){
  this.obtenerPeliculasFavoritas();
  this.categoria = "peliculas";
}

/**
* Función que se ejecuta al seleccionar series en el segmento de la parte superior.
*/
verSeriesFavoritas(){
  this.obtenerSeriesFavoritas();
  this.categoria = "series";
}

/**
* Función que obtiene las películas favoritas del usuario de la base de datos de firebase.
*/
obtenerPeliculasFavoritas(){
  this.pelis.on('value' ,item => {
    this.items = [];
    if (item.hasChild(this.usuario)) {
      item.child(this.usuario).forEach(itemValue => {
      this.items.push(itemValue.val());
      return false;
    });
    }
  });
}

/**
* Función que obtiene las series favoritas del usuario de la base de datos de firebase.
*/
obtenerSeriesFavoritas(){
  this.series.on('value' ,item => {
    this.items = [];
    if (item.hasChild(this.usuario)) {
      item.child(this.usuario).forEach(itemValue => {
      this.items.push(itemValue.val());
      return false;
    });
    }
  });
}

/**
* Función que elimina una película de la lista de películas favoritas del usuario.
*/
eliminarPelicula(item){
  this.pelis.child(this.usuario).child(item["nodo"]).remove();
  this.obtenerPeliculasFavoritas();
}

/**
* Función que elimina una serie de la lista de series favoritas del usuario.
*/
eliminarSerie(item){
  this.series.child(this.usuario).child(item["nodo"]).remove();
  this.obtenerSeriesFavoritas();
}

/**
* Función que muestra los detalles de la película seleccionada por el usuario de su lista de favoritos.
*/
verPelicula(item) {
  this.movieDatabase.getDetallesPelicula(item["id"])
  .then(res => {
    this.navCtrl.push(DetallePeliculaPage,{detallePelicula: res});
  });
}

/**
* Función que muestra los detalles de la serie seleccionada por el usuario de su lista de favoritos.
*/
verSerie(item){
  this.movieDatabase.getDetallesSerie(item["id"])
  .then(res => {
    this.navCtrl.push(DetalleSeriePage,{detalleSerie: res});
  });
}
}

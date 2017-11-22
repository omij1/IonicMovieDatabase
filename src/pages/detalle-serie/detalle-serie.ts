import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';
import {MovieDatabaseProvider} from '../../providers/movie-database/movie-database';
import firebase from 'firebase';
import {LoadingController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {DetalleActorPage} from '../../pages/detalle-actor/detalle-actor';

/**
 * Generated class for the DetalleSeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *	
 *	Created by Omar Marcos Julián
 */

@IonicPage()
@Component({
  selector: 'page-detalle-serie',
  templateUrl: 'detalle-serie.html',
})
export class DetalleSeriePage {

  usuario: string;
	serie: Object;
  favoritos: Array<any>;
  cast: Array<Object> = [];
  ref: firebase.database.Reference = 
     firebase.database().ref('/series');
  items = [];   
  numActores: number = 8;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private progressBar: RoundProgressConfig, public toastCtrl: ToastController,
    public movieDatabase: MovieDatabaseProvider, public loadingCtrl: LoadingController) {
  	
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.usuario = user.uid;
      }
    });
    
    this.serie = navParams.data.detalleSerie;
  	this.serie["backdrop_path"] = 'https://image.tmdb.org/t/p/w780'+this.serie["backdrop_path"];
  	this.serie["poster_path"] = 'https://image.tmdb.org/t/p/w500'+this.serie["poster_path"];
  	if (this.serie["vote_average"] % 1 == 0) {
  		this.serie["vote_average"] = this.serie["vote_average"] + ".0";
  	}
  	if (window.screen.availWidth >= 400 && window.screen.availWidth < 768) {
      progressBar.setDefaults({
        color: '#01d277',
        background: '#FAFAFA',
        stroke: 12,
        radius: 37,  
      });
    }
    else if(window.screen.availWidth <= 320){
      progressBar.setDefaults({
        color: '#01d277',
        background: '#FAFAFA',
        stroke: 10,
        radius: 30,  
      });
    }
    else if(window.screen.availWidth >= 325 && window.screen.availWidth <= 395){
      progressBar.setDefaults({
        color: '#01d277',
        background: '#FAFAFA',
        stroke: 13,
        radius: 33,  
      });
    }
    else if(window.screen.availWidth == 768){
      progressBar.setDefaults({
        color: '#01d277',
        background: '#FAFAFA',
        stroke: 15,
        radius: 45,  
      });
    }
    else{
      progressBar.setDefaults({
        color: '#01d277',
        background: '#FAFAFA',
        stroke: 20,
        radius: 48,  
      });
    }

    this.getCast();
  }

  /**
  * Función que se ejecuta cuando se carga la vista y que obtiene las series
  * favoritas del usuario actual.
  */
  ionViewDidLoad() {
    this.ref.on('value' ,item => {
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
  * Función que se comunica con el provider para obtener los actores principales
  * de la serie actual.
  */
  getCast(){
    return new Promise(resolve => {
        this.movieDatabase.getCastSerie(this.serie["id"])
        .then(res => {
          let contador = 0;
          res["cast"].forEach(cast => {

            if (contador < this.numActores) {
              if (cast["profile_path"] != null) {
                  cast["profile_path"] = 'https://image.tmdb.org/t/p/w500'+cast["profile_path"];
              }
              else{
                cast["profile_path"] = 'assets/imgs/no_imagen.jpeg';
              }  
              this.cast.push(cast);
            }
            contador++;
          });
        });
        resolve(true);
      });
  }

  /**
  * Función que se ejecuta cuando el usuario pulsa sobre el botón favoritos de 
  * la vista. Comprueba si la serie actual ya está en la lista de favoritos 
  * del usuario y actúa en consecuencia.
  */
  agregarFavoritos(){
     if (this.items === [] || this.items === null) {
      this.annadirSerie();
    }
    else{
      if (this.busquedaRepetido()) {
          this.mostrarYaExistente();
        }
      else{
        this.annadirSerie();
       }
    }
  }

  /**
  * En caso de que la serie no esté en la lista de favoritos del usuario actual
  * se añade a la base de datos de firebase para el usuario.
  */
  annadirSerie(){
    let myRef =  firebase.database().ref('/series').child(this.usuario).push();
    let clave = myRef.key;
    let item = {
      id: this.serie["id"],
      nombre: this.serie["name"],
      imagen: this.serie["poster_path"],
      nodo: clave
    };
    myRef.update(item);
    let success = this.toastCtrl.create({
              message: 'Serie agregada a favoritos',
              position: 'top',
              duration: 20
            });

        success.present();
  }

  /**
  * Función que comprueba si la serie se encuentra en la lista de favoritos del usuario.
  */
  busquedaRepetido(){
    for (var i = 0; i < this.items.length; i++) {
      if (this.serie["id"] === this.items[i]["id"]) {
        return true;
      }
    }
    return false;
  }

  /**
  * Función que muestra un toast informando de que la serie ya está en la lista de favoritos.
  */
  mostrarYaExistente(){
    let toast = this.toastCtrl.create({
              message: 'La serie ya se encuentra en la lista de favoritos',
              showCloseButton: true,
              position: 'top',
              closeButtonText: 'OK'
            });

            toast.present();
  }

  /**
  * Función que muestra los detalles del actor seleccionado en los slides.
  */
  perfilActor(id,retrato){
    const loading = this.presentLoadingCustom();
    this.movieDatabase.getInformacionActor(id)
    .then(res =>{
      if (res["place_of_birth"] === null) {
        res["place_of_birth"] = "No disponible";
      }
      if (res["deathday"] === null) {
        res["deathday"] = "No disponible";
      }
      loading.dismiss();
      this.navCtrl.push(DetalleActorPage,{detalleActor: retrato, actorId: id, detalleInfo: res});
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

}

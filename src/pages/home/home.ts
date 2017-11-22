import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PeliculasPage} from '../../pages/peliculas/peliculas';
import {SeriesPage} from '../../pages/series/series';
import {GentePage} from '../../pages/gente/gente';
import {ServicioBaseDatosProvider} from '../../providers/servicio-base-datos/servicio-base-datos'
import {LoginPage} from '../../pages/login/login';

/*	
 *	Created by Omar Marcos Julián
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 	titulo = "Principal";

  constructor(public navCtrl: NavController,public dbProvider: ServicioBaseDatosProvider) {

  }

/**
* Paginador de la pantalla principal.
*/
seleccionPrincipal(event: Event){
	switch(event.srcElement.parentElement.id){
		case "peliculas":
			this.navCtrl.push(PeliculasPage);
		break;

		case "series":
			this.navCtrl.push(SeriesPage);
		break;

		case "gente":
			this.navCtrl.push(GentePage);
		break;
	}
}

/**
* Permite cerrar la sesión del usuario en la aplicación.
*/
cerrarSesion(){
	this.dbProvider.logoutUsuario().then(() => {
		this.navCtrl.setRoot(LoginPage);
	});
}

}

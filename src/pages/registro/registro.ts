import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ServicioBaseDatosProvider} from '../../providers/servicio-base-datos/servicio-base-datos';
import {ValidadorEmail} from '../../validators/email';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

	public registroForm: FormGroup;
	public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
  	public alertCtrl: AlertController,public bdProvider: ServicioBaseDatosProvider,public formBuilder: FormBuilder) {
  
  	this.registroForm = formBuilder.group({
  		email: ['', Validators.compose([Validators.required,
  			ValidadorEmail.esValido])],
  		password: ['', Validators.compose([Validators.minLength(6),
  			Validators.required])]
  	});
  }

/**
* Función que se encarga de crearle una cuenta al usuario en firebase.
*/
registroUsuario(){
	if (!this.registroForm.valid) {
		console.log(this.registroForm.value);
	}
	else{
		this.bdProvider.registroUsuario(this.registroForm.value.email,
			this.registroForm.value.password).then(authData => {
				this.loading.dismiss().then(() => {
					this.navCtrl.setRoot(HomePage);
				});
			}, error => {
				this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons:[
            {
              text: "OK",
              role: 'cancel'
            }]
          });
          alert.present();
        });
			});
			this.loading = this.loadingCtrl.create();
			this.loading.present();
	}
}

}

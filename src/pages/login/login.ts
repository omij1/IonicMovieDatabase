import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ServicioBaseDatosProvider} from '../../providers/servicio-base-datos/servicio-base-datos';
import {ValidadorEmail} from '../../validators/email';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	public loginForm: FormGroup;
	public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public loadingCtrl: LoadingController,public alertCtrl: AlertController,
  	public bdProvider: ServicioBaseDatosProvider,public formBuilder: FormBuilder) {
  
    this.loginForm = formBuilder.group({
      email: ['',Validators.compose([Validators.required, 
        ValidadorEmail.esValido])],
      password: ['',Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

/**
* Función que verifica que el formato de los datos de login introducidos es correcto y en caso 
* afirmativo procede a la verificación en firebase.
*/
loginUsuario(){
	if (!this.loginForm.valid) {
		console.log(this.loginForm.value);
	}
	else{
		this.bdProvider.loginUsuario(this.loginForm.value.email,
			this.loginForm.value.password).then(authData => {
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

/**
* Función que muestra la página de registro.
*/
registro(){
  this.navCtrl.push('RegistroPage');
}

}

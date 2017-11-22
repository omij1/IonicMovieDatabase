import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ServicioBaseDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioBaseDatosProvider {

  constructor() {
  }

  loginUsuario(email: string, password: string): Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  registroUsuario(email: string, password: string): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(newUser => {
      firebase.database().ref('/usuarios').child(newUser.uid).set({email: email});
    });
  }

  logoutUsuario(): Promise<void>{
    return firebase.auth().signOut();
  }

}

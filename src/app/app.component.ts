import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {FiltroCategoriasPage} from '../pages/filtro-categorias/filtro-categorias';
import {LicenciaPage} from '../pages/licencia/licencia';
import {ProximamentePage} from '../pages/proximamente/proximamente';
import {CarteleraPage} from '../pages/cartelera/cartelera';
import {EnTelevisionPage} from '../pages/en-television/en-television';
import {EmisionHoyPage} from '../pages/emision-hoy/emision-hoy';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  peliculas: Array<{title: string, component: any}>;
  series: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyCiuQCag-iuQIMDHJRDTLJgu8sjfoDy284",
      authDomain: "moviedatabase-60e3f.firebaseapp.com",
      databaseURL: "https://moviedatabase-60e3f.firebaseio.com",
      projectId: "moviedatabase-60e3f",
      storageBucket: "moviedatabase-60e3f.appspot.com",
      messagingSenderId: "273964218272"
     });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
      else{
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

    this.initializeApp();

    this.pages = [
      { title: 'Principal', component: HomePage },
      {title: 'Favoritos', component: ListPage },
      {title: 'Filtrar por categoría', component:FiltroCategoriasPage},
      {title: 'Licencia', component: LicenciaPage}];

    this.peliculas = [
      {title: 'Proximamente', component: ProximamentePage},
      {title: 'En cartelera hoy', component: CarteleraPage}
    ];

    this.series = [
      {title: 'En televisión', component: EnTelevisionPage},
      {title: 'Se emiten hoy', component: EmisionHoyPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

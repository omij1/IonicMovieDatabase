import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';
import {LoginPageModule} from '../pages/login/login.module';
import {RegistroPageModule} from '../pages/registro/registro.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {FiltroCategoriasPage} from '../pages/filtro-categorias/filtro-categorias';
import {FiltroPeliculasPage} from '../pages/filtro-peliculas/filtro-peliculas';
import {FiltroSeriesPage} from '../pages/filtro-series/filtro-series';
import {LicenciaPage} from '../pages/licencia/licencia';
import {ProximamentePage} from '../pages/proximamente/proximamente';
import {CarteleraPage} from '../pages/cartelera/cartelera';
import {EnTelevisionPage} from '../pages/en-television/en-television';
import {EmisionHoyPage} from '../pages/emision-hoy/emision-hoy';

import {PeliculasPage} from '../pages/peliculas/peliculas';
import {SeriesPage} from '../pages/series/series';
import {GentePage} from '../pages/gente/gente';
import {DetallePeliculaPage} from '../pages/detalle-pelicula/detalle-pelicula';
import {DetalleSeriePage} from '../pages/detalle-serie/detalle-serie';
import {DetalleActorPage} from '../pages/detalle-actor/detalle-actor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieDatabaseProvider } from '../providers/movie-database/movie-database';
import { ServicioBaseDatosProvider } from '../providers/servicio-base-datos/servicio-base-datos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FiltroCategoriasPage,
    FiltroPeliculasPage,
    FiltroSeriesPage,
    LicenciaPage,
    ProximamentePage,
    CarteleraPage,
    EnTelevisionPage,
    EmisionHoyPage,
    PeliculasPage,
    SeriesPage,
    GentePage,
    DetallePeliculaPage,
    DetalleSeriePage,
    DetalleActorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RoundProgressModule,
    LoginPageModule,
    RegistroPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FiltroCategoriasPage,
    FiltroPeliculasPage,
    FiltroSeriesPage,
    LicenciaPage,
    ProximamentePage,
    CarteleraPage,
    EnTelevisionPage,
    EmisionHoyPage,
    PeliculasPage,
    SeriesPage,
    GentePage,
    DetallePeliculaPage,
    DetalleSeriePage,
    DetalleActorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieDatabaseProvider,
    ServicioBaseDatosProvider
  ]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroPeliculasPage } from './filtro-peliculas';

@NgModule({
  declarations: [
    FiltroPeliculasPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroPeliculasPage),
  ],
})
export class FiltroPeliculasPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroCategoriasPage } from './filtro-categorias';

@NgModule({
  declarations: [
    FiltroCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroCategoriasPage),
  ],
})
export class FiltroCategoriasPageModule {}

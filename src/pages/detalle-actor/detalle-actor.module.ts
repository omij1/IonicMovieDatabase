import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleActorPage } from './detalle-actor';

@NgModule({
  declarations: [
    DetalleActorPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleActorPage),
  ],
})
export class DetalleActorPageModule {}

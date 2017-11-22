import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSeriePage } from './detalle-serie';

@NgModule({
  declarations: [
    DetalleSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSeriePage),
  ],
})
export class DetalleSeriePageModule {}

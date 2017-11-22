import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GentePage } from './gente';

@NgModule({
  declarations: [
    GentePage,
  ],
  imports: [
    IonicPageModule.forChild(GentePage),
  ],
})
export class GentePageModule {}

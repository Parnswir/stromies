import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GasPage } from './gas';

@NgModule({
  declarations: [
    GasPage,
  ],
  imports: [
    IonicPageModule.forChild(GasPage),
  ],
})
export class GasPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VitalsignPage } from './vitalsign';

@NgModule({
  declarations: [
    VitalsignPage,
  ],
  imports: [
    IonicPageModule.forChild(VitalsignPage),
  ],
})
export class VitalsignPageModule {}

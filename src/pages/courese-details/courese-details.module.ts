import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoureseDetailsPage } from './courese-details';

@NgModule({
  declarations: [
    CoureseDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CoureseDetailsPage),
  ],
})
export class CoureseDetailsPageModule {}

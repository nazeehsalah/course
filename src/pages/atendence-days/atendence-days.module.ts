import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendenceDaysPage } from './atendence-days';

@NgModule({
  declarations: [
    AtendenceDaysPage,
  ],
  imports: [
    IonicPageModule.forChild(AtendenceDaysPage),
  ],
})
export class AtendenceDaysPageModule {}

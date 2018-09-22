import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitutesPage } from './institutes';

@NgModule({
  declarations: [
    InstitutesPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitutesPage),
  ],
})
export class InstitutesPageModule {}

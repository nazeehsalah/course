import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInstitutePage } from './add-institute';

@NgModule({
  declarations: [
    AddInstitutePage,
  ],
  imports: [
    IonicPageModule.forChild(AddInstitutePage),
  ],
})
export class AddInstitutePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstituteUsersPage } from './institute-users';

@NgModule({
  declarations: [
    InstituteUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(InstituteUsersPage),
  ],
})
export class InstituteUsersPageModule {}

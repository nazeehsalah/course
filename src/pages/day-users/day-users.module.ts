import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayUsersPage } from './day-users';

@NgModule({
  declarations: [
    DayUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(DayUsersPage),
  ],
})
export class DayUsersPageModule {}

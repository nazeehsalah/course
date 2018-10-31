import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeDayInfoPage } from './attende-day-info';

@NgModule({
  declarations: [
    AttendeDayInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendeDayInfoPage),
  ],
})
export class AttendeDayInfoPageModule {}

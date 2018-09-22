import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendancePage } from './atendance';

@NgModule({
  declarations: [
    AtendancePage,
  ],
  imports: [
    IonicPageModule.forChild(AtendancePage),
  ],
})
export class AtendancePageModule {}

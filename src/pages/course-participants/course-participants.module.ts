import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseParticipantsPage } from './course-participants';

@NgModule({
  declarations: [
    CourseParticipantsPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseParticipantsPage),
  ],
})
export class CourseParticipantsPageModule {}

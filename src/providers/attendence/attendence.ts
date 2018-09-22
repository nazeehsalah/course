import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Attendence } from '../../model/attendence';
import * as Firebase from 'firebase'
import { Course } from '../../model/course';
/*
  Generated class for the AttendenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendenceProvider {
  private attendenceList = this.db.list<Attendence>("attendence")
  constructor(
    public db: AngularFireDatabase
  ) {
  }
  attendeUser(attendence) {
    return this.attendenceList.push(attendence)
  }

  getCourseAttend(courseAttende: Course): Attendence {
    var childKey: Attendence
    Firebase.database().ref("attendence").orderByChild("courseKey").equalTo(courseAttende.key).once("value").then(function (snapshot) {
      childKey = snapshot.exportVal()
      console.log(childKey)
    })
    console.log(childKey)
    return childKey
  }
  getAttendInfo(key) {
    console.log(this.db.database.ref("attendence/" + key))
  }
  addDay(attendence: Attendence) {
    console.log(attendence)
    this.attendenceList.update(attendence.key, attendence)
  }
}

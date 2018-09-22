import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Institutes } from '../../model/institutes';

/*
  Generated class for the InstituteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstituteProvider {

  private institutes = this.db.list<Institutes>("institutes")
  constructor(
    public db: AngularFireDatabase
  ) {
  }
  getInstitutes() {
    return this.institutes
  }
  addInstitute(i: Institutes) {
    return this.institutes.push(i)
  }
  updateInstitute(i: Institutes) {
    return this.institutes.update(i.key, i)
  }
  deleteInstitute(i: Institutes) {
    return this.institutes.remove(i.key)
  }
  /*  enroleUserInCourse(user, course: Institutes) {
     course.users.push(user.key)
     return this.updateCourse(course)
   } */

}

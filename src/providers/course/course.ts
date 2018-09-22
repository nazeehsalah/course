import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Course } from '../../model/course';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider {
  private courses = this.db.list<Course>("courses")
  constructor(
    public db: AngularFireDatabase
  ) {
  }
  getCourses() {
    return this.courses
  }
  addCourse(c: Course) {
    return this.courses.push(c)
  }
  updateCourse(c: Course) {
    console.log(c.key)
    return this.courses.update(c.key, c)
  }
  deleteCourse(c: Course) {
    return this.courses.remove(c.key)
  }
  enroleUserInCourse(user, course: Course) {
    course.users.push(user.key)
    return this.updateCourse(course)
  }
}

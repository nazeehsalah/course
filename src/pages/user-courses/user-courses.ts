import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Course } from '../../model/course';
import * as firebase from 'firebase'


/**
 * Generated class for the UserCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-courses',
  templateUrl: 'user-courses.html',
})
export class UserCoursesPage {
  public keysObj: object
  public keysList = []
  public coursrsList: Course[] = []
  public course
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.keysObj = this.navParams.get("courses")
    Object.keys(this.keysObj).forEach(key => {
      console.log(this.keysObj[key])
      this.keysList.push(this.keysObj[key])
    })
    this.keysList.forEach(key => {
      this.course = this.getUsercourses(key)
    })
  }
  rootRef = firebase.database().ref();
  getUsercourses(key): Promise<any> {
    let childKey
    return new Promise(resolve => {
      this.rootRef.once("value")
        .then(snapshot => {
          childKey = snapshot.child("courses/" + key).val();
          console.log(childKey)
          if (childKey != null){
            this.setcoursInfo(childKey)
          }
          resolve(childKey)
        }),
        (error) => {
          console.log(error)
        }
    })
  }
  setcoursInfo(course) {
    this.coursrsList.push(course)
    console.log(this.coursrsList)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCoursesPage');
  }

}

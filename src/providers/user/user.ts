import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { User } from '../../model/user';
import { Course } from '../../model/course';
import * as firebase from 'firebase'
import 'rxjs/add/operator/map';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  public myPhotosRef: any;
  private users = this.db.list<User>("users")
  private userSignupSignture = "userSignupSignture/"
  private courseUsers: User[]
  public uploadTime
  constructor(
    public db: AngularFireDatabase
  ) {
  }
  getUsers() {
    console.log(this.users)
    return this.users
  }
  adduser(u: User) {
    return this.users.push(u)
  }
  updateUser(u: User) {
    return this.users.update(u.key, u)
  }
  deleteUser(u: User) {
    return this.users.remove(u.key)
  }
  enroleUserInCourse(user: User, course: Course) {
    user.courses.push(course.key)
    return this.updateUser(user)
  }
  uploadImage(imageString, user: User, location: string): Promise<any> {
    let image: string,
      storageRef: any,
      parseUpload: any;
    if (location == "attendecneSigns/" || location == "LeaveSigns/") {
      this.uploadTime = new Date().toString()
      console.log(this.uploadTime)
      image = user.identity + this.uploadTime + '.png'
      console.log("image:", image)
    } else {
      image = user.identity + '.png'
    }
    console.log(image)
    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref(location + image);
      parseUpload = storageRef.putString(imageString, 'data_url');
      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          console.log("error")
          reject(_err);
        },
        () => {
          console.log("success upload")
          resolve(parseUpload.snapshot);
        });
    });
  }
  getImageURl(storge, identity) {
    return firebase.storage().ref().child(storge + identity + ".png").getDownloadURL()
  }
  getCourseUsers(key2: string) {
    let rootRef = firebase.database().ref();
    console.log(key2)
    return rootRef.once("value")
      .then(function (snapshot) {
        var childKey = snapshot.child("users/" + key2).exportVal(); // "ada"
      });
  }
}

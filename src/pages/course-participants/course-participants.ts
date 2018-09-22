import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, AlertController } from 'ionic-angular';
import { User } from '../../model/user'
import * as firebase from 'firebase'
import { Course } from '../../model/course';
import { CourseProvider } from '../../providers/course/course';
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the CourseParticipantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-participants',
  templateUrl: 'course-participants.html',
})
export class CourseParticipantsPage {

  public keysObj: object
  public keysList = []
  public userList: User[] = []
  public user/* : Promise<User> */
  public choiceUser
  public courseInfo: Course
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public courseProvider: CourseProvider,
    public userProvide: UserProvider,
    public utils: UtilsProvider,
    public alerCtrl: AlertController
  ) {
    this.choiceUser = this.navParams.get("choiceUser")
    if (this.choiceUser == undefined) {
      this.choiceUser = false
    } else {
      this.choiceUser = true
    }
    console.log(this.choiceUser)
    this.courseInfo = this.navParams.get("course")
    this.keysObj = this.courseInfo.users
    Object.keys(this.keysObj).forEach(key => {
      this.keysList.push(this.keysObj[key])
    })
    this.keysList.forEach(key => {
      this.user = this.getUserIncourse(key)
    })

  }
  rootRef = firebase.database().ref();
  getUserIncourse(key): Promise<any> {
    let childKey
    return new Promise(resolve => {
      this.rootRef.once("value")
        .then(snapshot => {
          childKey = snapshot.child("users/" + key).val();
          if (childKey != null ||childKey!= undefined)
            this.setUserInfo(childKey)
          resolve(childKey)
        }),
        (error) => {
          this.utils.BasicAlert("حدث خطا من فضلك حاول مره اخرى", "خطأ")
        }
    })
  }
  setUserInfo(user) {
    this.userList.push(user)
  }
  dismissUserModal() {
    this.viewCtrl.dismiss()
  }
  dismissUserModalWithData(user) {
    if (this.choiceUser == true)
      this.viewCtrl.dismiss(user)
  }
  deleteUser(user: User) {
    let alert = this.alerCtrl.create({
      message: "هل انت متاكد من حذف هذا المستخد",
      title: "",
      buttons: [
        {
          text: "موافق",
          handler: (() => {
            this.utils.showLoading()
            let index = this.courseInfo.users.indexOf(user.key, 0)
            if (index > -1)
              this.courseInfo.users.splice(index, 1)
            else {
              this.utils.hideLoading()
              this.utils.BasicAlert("هذا المستخدم تم حذفه من قبل", "تحذير")
            }
            index = user.courses.indexOf(this.courseInfo.key, 0)
            if (index > -1)
              user.courses.splice(index, 1)
            else {
              this.utils.hideLoading()
              this.utils.BasicAlert("هذا المستخدم تم حذفه من قبل", "تحذير")
            }
            this.courseProvider.updateCourse(this.courseInfo).then(() => {
              this.userProvide.updateUser(user).then(() => {
                this.userList = []
                this.keysObj = this.courseInfo.users
                this.keysList = []
                Object.keys(this.keysObj).forEach(key => {
                  this.keysList.push(this.keysObj[key])
                })
                this.keysList.forEach(key => {
                  this.user = this.getUserIncourse(key)
                })
                this.utils.hideLoading()
                this.utils.BasicAlert("تم حذف المستخدم","تاكيد")
              })
            })
              .catch((err) => {
                this.utils.BasicAlert("حدث خطأ أثناء الحذف", "خطأ")
              })
          })
        },
        {
          text: "غير موافق",
          handler: (() => {
            console.log("غير موافق")
          })
        }
      ]
    })
    alert.present()
  }
}

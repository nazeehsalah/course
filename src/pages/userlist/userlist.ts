import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../../model/user'
import { UserProvider } from '../../providers/user/user';
import { UserDetailsPage } from '../user-details/user-details';
import { CourseProvider } from '../../providers/course/course';
import { HomePage } from '../home/home'
import { UserCoursesPage } from '../user-courses/user-courses';
import { UtilsProvider } from '../../providers/utils/utils';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {
  public users: Observable<User[]>;
  public press: number = 0;
  public course
  public enrollUSer = false;
  public courseAdding = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public modal: ModalController,
    public courseProvider: CourseProvider,
    public utils: UtilsProvider,
    public alertCtrl: AlertController,
    public auth: AuthProvider

  ) {
    console.log("userList")
    this.enrollUSer = this.navParams.get("add")
    if (this.enrollUSer == undefined) {
      this.enrollUSer = false
    } else {
      this.enrollUSer = true
      this.course = this.navParams.get("course")
    }
    console.log("Enroll " + this.enrollUSer)
    this.initilize()
  }
  getUserCourse(courses) {
    console.log(this.enrollUSer)
    if (!this.enrollUSer)
      this.navCtrl.push(UserCoursesPage, { courses: courses })
  }
  /**
   * Perform a service for the proper items.
   */

  checkUserIncourse(coursesList: string[]): boolean {
    if (this.enrollUSer) {
      for (let i = 0; i < coursesList.length; i++) {
        if (coursesList[i] == this.course.key) {
          console.log(true)
          return true
        }
      }
    }
    return false
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item) {
  }
  addUser() {
    this.navCtrl.push(SignupPage, { "adminAdding": true })
  }
  pressEvent(ev) {

  }
  userDetails(user) {
    let detailsmodal = this.modal.create(UserDetailsPage, { user: user });
    detailsmodal.present();
  }
  deleteUser(user: User) {
    let alert = this.alertCtrl.create({
      message: "هل متاكد من حذف هذا المستخدم",
      title: "تاكيد",
      buttons: [
        {
          text: "موافق",
          handler: (() => {
            this.utils.showLoading()
            //this.auth.deleteUser(user)
            this.userProvider.deleteUser(user)
              .then(
                () => {
                  this.utils.hideLoading()
                },
                error => {
                  this.utils.hideLoading()
                  this.utils.BasicAlert("حدث خطأ أثناء الحذف من فضلك حاول مره اخرى", "خطأ")
                }
              )
          })
        },
        {
          text: "غير موافق",
          handler: (() => {
            console.log("غير موفق على الحذف")
          })
        }
      ]
    })
    alert.present()
  }
  editUser(user) {
    this.navCtrl.push(SignupPage, { user: user, editUser: true })
  }
  addUserToCourse(user) {
    this.utils.showLoading()
    this.courseProvider.enroleUserInCourse(user, this.course)
      .then(
        () => {
          console.log("enroll Done")
        },

      ).catch(
        error => {
          console.log(error)
        })
    this.userProvider.enroleUserInCourse(user, this.course)
      .then(() => {
        this.utils.hideLoading()
      })
      .catch(
        error => {
          console.log(error)
        })
  }
  addCouresToUser(user) {
    this.navCtrl.push(HomePage, { user: user, courseAdding: true })
  }
  public search: boolean = false
  public searchList: any[] = []
  getItems(ev) {
    this.search = true
    this.initilize()
    var searchText = ev.target.value;
    // Avoid research if searchtext is empty
    if (!searchText || searchText.trim() === '') {
      this.onCancel()
      return;
    }
    this.users = this.users.filter((v) => {
      v.forEach(element => {
        let i = element.name.indexOf(searchText)
        if (i > -1) {
          this.searchList.push(element)   // Here, the filtered item is good
          return true;
        }
      });
      return false;
    })
  }
  onCancel() {
    this.search = false
    this.initilize()
  }
  initilize() {
    this.searchList = []
    this.users = this.userProvider.getUsers()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(
            u => ({
              key: u.payload.key, ...u.payload.val()
            })
          )
        },
        error => {
          console.log(error)
        }
      )
  }
}

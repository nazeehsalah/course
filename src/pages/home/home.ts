import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ViewController, MenuController } from 'ionic-angular';
import { AddCoursePage } from '../add-course/add-course';
import { CourseProvider } from '../../providers/course/course';
import { Course } from '../../model/course';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { CoureseDetailsPage } from '../courese-details/courese-details';
import { UserlistPage } from '../userlist/userlist';
import { UserProvider } from '../../providers/user/user'
import { CourseParticipantsPage } from '../course-participants/course-participants';
import { UtilsProvider } from '../../providers/utils/utils';
import { User } from '../../model/user';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage';
import { AtendenceDaysPage } from '../atendence-days/atendence-days';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public coursesList: Observable<Course[]>
  public courseAdding: boolean
  public user: User
  public choiceCourse
  public loginUser: User
  public adminRole: boolean = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public courseProvider: CourseProvider,
    public db: AngularFireDatabase,
    public modal: ModalController,
    public userProvider: UserProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    public menu: MenuController,
    private storage: Storage
  ) {
    this.loginUser = this.navParams.get("loginuser")
    if (this.loginUser == undefined) {
      this.storage.get("user").then((val) => {
        this.setLoginUser(val)
      }).then(() => {
        if (this.loginUser.role == "مستخدم") {
          this.adminRole = false
          this.menu.enable(true, "user")
          this.menu.enable(false, "menu-dark")
          console.log("مستخدك")
          console.log(this.menu.getMenus())
        }
        else if (this.loginUser.role == "مدير") {
          this.adminRole = true
          this.menu.enable(false, "user")
          this.menu.enable(true, "menu-dark")
        } else {
          console.log("else")
        }
        this.initilize()

      })
    } else {
      if (this.loginUser.role == "مستخدم") {
        this.adminRole = false
        this.menu.enable(true, "user")
        this.menu.enable(false, "menu-dark")
        console.log("مستخدك")
        console.log(this.menu.getMenus())
      }
      else if (this.loginUser.role == "مدير") {
        this.adminRole = true
        this.menu.enable(false, "user")
        this.menu.enable(true, "menu-dark")
        console.log("مي")
        console.log(this.menu.getMenus())
      } else {
        console.log("else")
      }
      this.initilize()

    }

    this.choiceCourse = this.navParams.get("choiceCourse")
    if (this.choiceCourse == undefined) {
      this.choiceCourse = false
    } else (
      this.choiceCourse = true
    )
    this.courseAdding = this.navParams.get("courseAdding")
    if (this.courseAdding == undefined) {
      this.courseAdding = false
    } else {
      this.courseAdding = true
      console.log(this.courseAdding)
      this.user = this.navParams.get("user")
      console.log(this.user)
    }
  }
  enroleUser(course: Course) {
    this.navCtrl.push(UserlistPage, { course: course, add: true })
  }
  openUsersInCourse(Course) {
  }
  setLoginUser(val) {
    this.loginUser = val
  }
  deleteCourse(course: Course) {
    let confirmDel = this.alertCtrl.create({
      title: "تاكيد",
      subTitle: "هل تريد مسح هذه الدوره",
      buttons: [{
        text: "موافق",
        handler: () => {
          this.utils.showLoading()
          let rootRef = firebase.database().ref();
          course.users.forEach(key => {
            console.log(key)
            let childKey: User
            rootRef.once("value")
              .then(snapshot => {
                childKey = snapshot.child("users/" + key).val();
                if (childKey != null)
                  childKey.courses.forEach(c => {
                    if (c == course.key) {
                      console.log("equle")
                      let index = childKey.courses.indexOf(c, 0)
                      childKey.courses.splice(index, 1)
                      console.log(childKey)
                      this.userProvider.updateUser(childKey).then(() => {
                      }).catch(err => {
                        this.utils.BasicAlert(err, "خطا")
                      })
                    }
                  })
              }),
              (error) => {
                this.utils.BasicAlert("حدث خطا من فضلك حاول مره اخرى", "خطأ")
              }
          });
          this.courseProvider.deleteCourse(course).then(
            () => {
              this.utils.hideLoading();
              this.utils.BasicAlert("تم حذف الدوره", "تاكيد")
            }
          ).catch(err => {
            this.utils.BasicAlert("حدث خطا ف حذف هذه الدوره من فضلك حاول مره اخرى", "خطا")
          })
        }
      },
      {
        text: "غير موافق"
      }
      ]
    });
    confirmDel.present();
  }
  editCourse(course) {
    this.navCtrl.push(AddCoursePage, { "course": course, btnedit: true })
  }
  courseDetaisl(course) {
    let detailsmodal = this.modal.create(CoureseDetailsPage, { course: course });
    detailsmodal.present();
  }
  goToCourseParticipant(course: Course) {
    this.navCtrl.push(CourseParticipantsPage, { course: course })
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
    this.coursesList = this.coursesList.filter((v) => {
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
    this.coursesList = this.courseProvider.getCourses()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(
            c => ({
              key: c.payload.key, ...c.payload.val()
            })
          )
        }
      )
  }
  addItem() {
    this.navCtrl.push(AddCoursePage)
  }
  /*  addcourse(course: Course) {
     console.log("add")
     if (!this.adminRole)
       this.addcourse(course)
   } */
  addCourseToUSer(course: Course) {
    if (this.user == undefined)
      this.user = this.loginUser
    console.log(this.user)
    if (!this.adminRole) {
      let alert = this.alertCtrl.create({
        title: "تاكيد",
        message: "سوف تصبح مشترك بهذه الدوره قيجب عليك الالتزام بمواعيدها",
        buttons: [
          {
            text: "موافق",
            handler: () => {
              this.courseProvider.enroleUserInCourse(this.user, course)
              this.userProvider.enroleUserInCourse(this.user, course)
              this.courseDetaisl(course)
              this.storage.set("user", this.user)
            }
          },
          {
            text: "غير موافق"
          }
        ]
      })
      alert.present()
    } else {
      this.courseProvider.enroleUserInCourse(this.user, course)
      this.userProvider.enroleUserInCourse(this.user, course)
        .then(
          error => { console.log(error) }
        )
    }
  }
  dismissModal() {
    this.viewCtrl.dismiss()
  }
  dismissModalWithData(course) {
    this.viewCtrl.dismiss(course)
  }
  checkUserIncourse(coursesList: string[]): boolean {
    if (this.courseAdding || !this.adminRole) {
      for (let i = 0; i < coursesList.length; i++) {
        if (this.user == undefined) {
          if (coursesList[i] == this.loginUser.key) {
            if (!this.adminRole && this.choiceCourse)
              return false
            else return true
          }
        } else {
          if (coursesList[i] == this.user.key || coursesList[i] == this.loginUser.key) {
            return true
          }
        }
      }
    }
    if (!this.adminRole && this.choiceCourse)
      return true
    else return false
  }
  goToAttendenceDays(c: Course) {
    this.navCtrl.push(AtendenceDaysPage, { course: c })
  }
}

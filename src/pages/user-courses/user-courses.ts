import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Course } from '../../model/course';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
import { CoureseDetailsPage } from '../courese-details/courese-details';
import { UserProvider } from '../../providers/user/user';
import { CourseProvider } from '../../providers/course/course';
import { UtilsProvider } from '../../providers/utils/utils';
import { ClanerPage } from '../claner/claner';


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
    private storage: Storage,
    public modal: ModalController,
    private userProvidor: UserProvider,
    public utils: UtilsProvider,
    public alert: AlertController,
    private courseProvidor: CourseProvider
  ) {
    this.keysObj = this.navParams.get("courses")
    console.log(this.keysObj)
    if (this.keysObj == undefined) {
      this.storage.get("user")
        .then((val) => {
          this.setLoginUser(val)
        }).then(() => {
          this.keysObj = this.loginUser.courses
          Object.keys(this.keysObj).forEach(key => {
            console.log(this.keysObj[key])
            this.keysList.push(this.keysObj[key])
          })
          this.keysList.forEach(key => {
            this.course = this.getUsercourses(key)
          })
        })
    }
    else {
      Object.keys(this.keysObj).forEach(key => {
        console.log(this.keysObj[key])
        this.keysList.push(this.keysObj[key])
      })
      this.keysList.forEach(key => {
        this.course = this.getUsercourses(key)
      })
    }
  }
  loginUser: User
  public admin: boolean = true
  setLoginUser(val) {
    this.loginUser = val
    if (this.loginUser.role == "مستخدم")
      this.admin = false
  }
  rootRef = firebase.database().ref();
  getUsercourses(key): Promise<any> {
    let childKey
    return new Promise(resolve => {
      this.rootRef.once("value")
        .then(snapshot => {
          childKey = snapshot.child("courses/" + key).val();
          if (childKey != null && childKey) {
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
  courseDetaisl(course) {
    let detailsmodal = this.modal.create(CoureseDetailsPage, { course: course });
    detailsmodal.present();
  }
  delete(c: Course) {
    if (!this.admin) {
      let a = this.alert.create({
        title: "تاكيد",
        message: 'هل انت متاكد من انسحابك من هذه الدوره',
        buttons: [
          {
            text: "موافق",
            handler: () => {
              this.utils.showLoading()
              this.loginUser.courses.splice(this.loginUser.courses.indexOf(c.key, 0), 1)
              c.users.splice(c.users.indexOf(this.loginUser.key, 0), 1)
              this.userProvidor.updateUser(this.loginUser).then(() => {
                this.courseProvidor.updateCourse(c).then(() => {
                  this.storage.set("user", this.loginUser).then(() => {
                    this.coursrsList = []
                    this.keysList = []
                    this.storage.get("user")
                      .then((val) => {
                        this.setLoginUser(val)
                      }).then(() => {
                        this.keysObj = this.loginUser.courses
                        Object.keys(this.keysObj).forEach(key => {
                          console.log(this.keysObj[key])
                          this.keysList.push(this.keysObj[key])
                        })
                        this.keysList.forEach(key => {
                          this.course = this.getUsercourses(key)
                        })
                      })
                    this.utils.hideLoading()
                  })
                })
              })
            }
          },
          {
            text: "غير موافق",
            handler: () => {
            }
          }
        ]
      })
      a.present()
    }
  }
  showcalender(c: Course) {
    this.navCtrl.push(ClanerPage, { user: this.loginUser, course: c })
  }
}

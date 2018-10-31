import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Course } from '../../model/course';
import { CourseProvider } from '../../providers/course/course';
import { UtilsProvider } from '../../providers/utils/utils';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-course',
  templateUrl: 'add-course.html',
})
export class AddCoursePage {
  public course: Course = {
    name: '',
    nameInEnglish:'',
    code: '',
    deprt: "",
    startDate: "",
    endDate: '',
    dayAbsance: "",
    lastTime: '',
    type: "free",
    users: ["0"]
  }
  public btn_edit = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public courseProvider: CourseProvider,
    public utils: UtilsProvider
  ) {
  }

  ionViewDidLoad() {
    this.btn_edit = this.navParams.get("btnedit")
    if (this.btn_edit == undefined) {
      this.btn_edit = false
    } else {
      this.btn_edit = true
      this.course = this.navParams.get("course")
    }
  }
  updateCourse() {
    if (this.checkCourse()) {
      this.utils.showLoading()
      this.courseProvider.updateCourse(this.course)
        .then(
          () => {
            this.utils.hideLoading()
            this.utils.BasicAlert("تم تعديل هذه الدوره", "تم")
            this.navCtrl.setRoot(HomePage)
          },
          error => {
            this.utils.BasicAlert("خطأ فى تعديل هذه الدوره حاول مره اخرى", "خطأ")
          }
        )
    }
    else {
      this.utils.BasicAlert("من فضلط قم بادخال جميع البيانات", "خطا")
    }

  }
  addCourse() {
    if (this.checkCourse()) {
      this.utils.showLoading()
      this.courseProvider.addCourse(this.course)
        .then(
          () => {
            this.utils.hideLoading();
            this.navCtrl.setRoot(HomePage)
          },
          error => {
            this.utils.BasicAlert("خطا", "ERROR")
          }
        )
    }
    else {
      this.utils.BasicAlert("من فضلط قم بادخال جميع البيانات", "خطا")
    }

  }
  checkCourse(): boolean {
    if (
      this.course.code != ''
      && this.course.deprt != ''
      && this.course.endDate != ''
      && this.course.lastTime != ''
      && this.course.name != ''
      && this.course.nameInEnglish !=''
      && this.course.startDate != ''
      && this.course.type != ''
    )
      return true
    else
      return false
  }
}

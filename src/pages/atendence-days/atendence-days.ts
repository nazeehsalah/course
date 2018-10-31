import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Course } from '../../model/course';
import * as Firebase from 'firebase'
import { Attendence } from '../../model/attendence';
import { DayUsersPage } from '../day-users/day-users';
import { UtilsProvider } from '../../providers/utils/utils';


/**
 * Generated class for the AtendenceDaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atendence-days',
  templateUrl: 'atendence-days.html',
})
export class AtendenceDaysPage {
  public courseInfo: Course
  public daysList = [];
  public attendceInfo: Attendence
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider
  ) {
    this.courseInfo = this.navParams.get("course")
  }
  public attendFound: boolean
  ionViewDidLoad() {
    Firebase.database().ref("attendence").orderByChild("courseKey").equalTo(this.courseInfo.key).once("value").then(s => {
      console.log(s.val())
      if (s.val() == null) {
        this.attendFound = false;
        this.utils.BasicAlert("لا يوجد غياب لهذه الدوره", "معلومه")
        this.navCtrl.pop()
      } else {
        this.attendFound = true
        Object.keys(s.val()).forEach(key => {
          this.attendceInfo = s.val()[key]
        })
      }

    }).then(() => {
      if (this.attendFound) {
        this.daysList = this.getDates(new Date(this.courseInfo.startDate), new Date(this.courseInfo.endDate))

      }
    })


  }
  getDates(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate).toDateString());
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }
  goToUsersList(day) {
    this.navCtrl.push(DayUsersPage, { atendence: this.attendceInfo, day: day })
  }
}

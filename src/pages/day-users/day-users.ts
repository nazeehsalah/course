import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Attendence, usersdata } from '../../model/attendence';
import { User } from '../../model/user';
import * as Firebase from 'firebase'
import { AttendeDayInfoPage } from '../attende-day-info/attende-day-info';


/**
 * Generated class for the DayUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface UserInformation {
  user: User,
  dayInfo: usersdata
}
@IonicPage()
@Component({
  selector: 'page-day-users',
  templateUrl: 'day-users.html',
})
export class DayUsersPage {
  public attenInfo: Attendence;
  public day;
  public userInfo: UserInformation
  public usersList: {}[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.attenInfo = this.navParams.get("atendence")
    this.day = this.navParams.get("day")
    for (let i = 0; i < this.attenInfo.usersKeys.length; i++) {
      console.log("loop1")
      for (let j = 0; j < this.attenInfo.usersKeys[i].days.length; j++) {
        console.log("loop2")
        console.log(new Date(this.day), new Date(this.attenInfo.usersKeys[i].days[j].date))
        if (new Date(this.day).toDateString() == new Date(this.attenInfo.usersKeys[i].days[j].date).toDateString()) {
          Firebase.database().ref("users/" + this.attenInfo.usersKeys[i].userKey).once("value").then(s => {
            /* this.userInfo.user = s.val()
            this.userInfo.dayInfo = this.attenInfo.usersKeys[i].days[j].usersData */
            this.usersList.push({ user: s.val(), dayInfo: this.attenInfo.usersKeys[i].days[j].usersData })

          }).then(() => {
            console.log(this.usersList)
          })
          break;
        }
      }
    }
  }
  ionViewDidLoad() {
  }
  goToAttendInfo(item) {
    this.navCtrl.push(AttendeDayInfoPage, { info: item })
  }
}

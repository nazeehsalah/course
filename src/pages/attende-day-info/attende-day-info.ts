import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttendeDayInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attende-day-info',
  templateUrl: 'attende-day-info.html',
})
export class AttendeDayInfoPage {
  public info={
    user:{},
    dayInfo:{}
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.info = this.navParams.get("info");
  }

}

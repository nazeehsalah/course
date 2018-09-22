import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../model/user';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  public user: User = {
    email: "",
    company: '',
    name: '',
    identity: '',
    password: "",
    gender: "",
    myDate: '',
    number: '',
    sign: '',
    courses: ["teste", "eiru", "jfdk", "fjdh", 'sdhfj', "hsdfj", "dshj", "hfdsj", "hjfd", "jgfs"]
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController

  ) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get("user")
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }

}

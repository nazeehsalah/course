import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';

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
    nameInEnglish: '',
    role: '',
    courses: ["teste", "4"]
  }
  public admin: boolean = true
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private stor: Storage
  ) {
    this.user = this.navParams.get("user")
    if (this.user == undefined) {
      this.admin = false
      this.user = {
        email: "",
        company: '',
        name: '',
        identity: '',
        password: "",
        gender: "",
        myDate: '',
        number: '',
        nameInEnglish: '',
        role: '',
        courses: ["teste", "4"]
      }
      console.log("if")
      this.stor.get("user").then((v: User) => {
        console.log(v)
        this.user = v
      })
    }
  }

  ionViewDidLoad() {

  }
  dismiss() {
    this.viewCtrl.dismiss()
  }

}

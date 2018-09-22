import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Institutes } from '../../model/institutes';
import { UtilsProvider } from '../../providers/utils/utils';
import { User } from '../../model/user';
import * as firebase from 'firebase'
/**
 * Generated class for the InstituteUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-institute-users',
  templateUrl: 'institute-users.html',
})
export class InstituteUsersPage {
  public institut: Institutes
  public userList: User[] = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider
  ) {
    this.utils.showLoading()
    this.institut = this.navParams.get("institut")
    if (this.institut != undefined) {
      let rootRef = firebase.database().ref("users/");
      rootRef.orderByChild("company").equalTo(this.institut.key).once("value")
        .then(s => {
          console.log(s.val())
          Object.keys(s.val()).forEach(k => {
            this.userList.push(s.val()[k])
          })
        })
      this.utils.hideLoading()
    } else {
      this.utils.hideLoading()
      this.utils.BasicAlert("قد حدث خطا من فضلك حاول مره اخرى", "خطا")
    }
  }
  ionViewDidLoad() {
  }

}

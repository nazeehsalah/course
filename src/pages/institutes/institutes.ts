import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InstituteProvider } from '../../providers/institute/institute';
import { Observable } from 'rxjs';
import { Institutes } from '../../model/institutes';
import { AddInstitutePage } from '../add-institute/add-institute';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase'
import { User } from '../../model/user';
import { UserProvider } from '../../providers/user/user';
import { InstituteUsersPage } from '../institute-users/institute-users';


/**
 * Generated class for the InstitutesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-institutes',
  templateUrl: 'institutes.html',
})
export class InstitutesPage {
  public institutesList: Observable<Institutes[]>
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public instituteProvider: InstituteProvider, public alertCtrl: AlertController,
    public utils: UtilsProvider, public userProvider: UserProvider
  ) {
    this.initilize()
  }
  initilize() {
    this.searchList = []
    this.institutesList = this.instituteProvider.getInstitutes()
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
    this.navCtrl.push(AddInstitutePage)
  }
  ionViewDidLoad() {
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
    this.institutesList = this.institutesList.filter((v) => {
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
  deleteInstitute(institute: Institutes) {
    let confirmDel = this.alertCtrl.create({
      title: "تاكيد",
      subTitle: "هل تريد حذف هذه المؤسسه عند حذف هذه المؤسسه سيتم حذفها من الاعضاء ايضا",
      buttons: [{
        text: "موافق",
        handler: () => {
          this.utils.showLoading()
          let rootRef = firebase.database().ref("users/");
          let usersList: User[] = []
          rootRef.orderByChild("company").equalTo(institute.key).once("value")
            .then(s => {
              Object.keys(s.val()).forEach(k => {
                usersList.push(s.val()[k])
              })
            }).then(() => {
              usersList.forEach(user => {
                user.company = "لايوجد"
                this.userProvider.updateUser(user)
                  .then(() => {
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
              this.instituteProvider.deleteInstitute(institute)
              this.utils.hideLoading()
              this.utils.BasicAlert("تم حذف هذه المؤسسه", "تاكيد")
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
  edit(institute: Institutes) {
    this.navCtrl.push(AddInstitutePage, { institut: institute, btnedit: true })
  }
  goToUsers(institut: Institutes) {
    this.navCtrl.push(InstituteUsersPage, { institut: institut })
  }
}
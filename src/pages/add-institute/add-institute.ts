import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Institutes } from '../../model/institutes';
import { UtilsProvider } from '../../providers/utils/utils';
import { InstituteProvider } from '../../providers/institute/institute';
import { InstitutesPage } from '../institutes/institutes';

/**
 * Generated class for the AddInstitutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-institute',
  templateUrl: 'add-institute.html',
})
export class AddInstitutePage {
  public institut: Institutes = {
    code: '',
    desc: '',
    name: '',
  }
  public btn_edit = false
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public instituteProvider: InstituteProvider, public utils: UtilsProvider
  ) {
  }

  ionViewDidLoad() {
    this.btn_edit = this.navParams.get("btnedit")
    if (this.btn_edit == undefined) {
      this.btn_edit = false
    } else {
      this.btn_edit = true
      this.institut = this.navParams.get("institut")
    }
  }
  checkInstitut(): boolean {
    if (
      this.institut.code != ''
      && this.institut.name != ''
    )
      return true
    else
      return false
  }
  addInstitut() {
    if (this.checkInstitut()) {
      this.utils.showLoading()
      this.instituteProvider.addInstitute(this.institut)
        .then(
          () => {
            this.utils.hideLoading();
            this.navCtrl.setRoot(InstitutesPage)
          },
          error => {
            this.utils.BasicAlert("خطا", "ERROR")
          }
        )
    }
    else {
      this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات", "خطا")
    }
  }
  updateInstitut() {
    if (this.checkInstitut()) {
      this.utils.showLoading()
      this.instituteProvider.updateInstitute(this.institut)
        .then(
          () => {
            this.utils.hideLoading()
            this.utils.BasicAlert("تم تعديل هذه المؤسسه", "تم")
            this.navCtrl.setRoot(InstitutesPage)
          },
          error => {
            this.utils.BasicAlert("خطأ فى تعديل هذه المؤسسه حاول مره اخرى", "خطأ")
          }
        )
    }
    else {
      this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات", "خطا")
    }

  }
}

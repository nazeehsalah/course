import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../model/user';
import { AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';
import { UserlistPage } from '../userlist/userlist';
import { UserProvider } from '../../providers/user/user'
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import 'rxjs/Rx';
import { UtilsProvider } from '../../providers/utils/utils';
import { Observable } from 'rxjs/Rx';
import { Institutes } from '../../model/institutes';
import { InstituteProvider } from '../../providers/institute/institute';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage: string;

  public account: User = {
    email: '',
    name: '',
    identity: '',
    password: '',
    number: '',
    myDate: 'MM/DD/YYYY',
    gender: 'm',
    sign: '',
    company: '',
    courses: ['1']
  }
  public rePassword
  public adminAdding = false
  public editUser = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public userProvider: UserProvider,
    public utils: UtilsProvider,
    public menu: MenuController,
    public instituteProvider: InstituteProvider
  ) {
    this.adminAdding = this.navParams.get("adminAdding")
    this.editUser = this.navParams.get("editUser")
    if (this.editUser == undefined) {
      this.editUser = false
      this.menu.enable(false, "menu-dark")
    }
    else {
      this.editUser = true
      this.account = this.navParams.get("user")
    }
    this.options = this.instituteProvider.getInstitutes()
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
  public options: Observable<Institutes[]>
  ionViewDidLoad() {
    
  }

  drawClear() {
    this.signaturePad.clear();
  }
  signup() {
    if (
      this.account.company == ''
      || this.account.email == ''
      || this.account.gender == ''
      || this.account.identity == ''
      || this.account.myDate == ''
      || this.account.name == ''
      || this.account.number == ''
      || this.account.password == ''
      || this.signaturePad.isEmpty()
      || this.rePassword == ''
    ) {
      this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات", "خطأ")
    } else {
      if (this.account.password != this.rePassword) {
        this.utils.BasicAlert("قم بالتاكد من الرقم السرى وتاكيده", "خطأ")
      }
      else {
        this.utils.showLoading()
        this.account.sign = this.signaturePad.toDataURL();
        this.auth.signUp(this.account)
          .then(
            () => {
              this.userProvider.uploadImage(this.account.sign, this.account, "userSignupSignture/")
                .then(
                  () => {
                    this.userProvider.getImageURl("userSignupSignture/", this.account.identity)
                      .then(url => {
                        this.account.sign = url
                        this.userProvider.adduser(this.account)
                          .then(() => {
                            this.utils.hideLoading();
                            this.menu.enable(true, "menu-dark")
                            this.navCtrl.setRoot(UserlistPage)
                          })

                      })
                      .catch(err => {
                      })
                  }
                )
                .catch(err => {
                })
            }
          )
          .catch(err => {
            this.utils.BasicAlert("خطأ فى التسجيل تاكد من البريد الالكترونى والرقم السرى", "خطأ")
            this.utils.hideLoading()
          })
      }
    }
  }
  editUserFun() {
    if (
      this.account.company == ''
      || this.account.email == ''
      || this.account.gender == ''
      || this.account.identity == ''
      || this.account.myDate == ''
      || this.account.name == ''
      || this.account.number == ''
      || this.account.password == ''
      || this.signaturePad.isEmpty
      || this.rePassword == ''
    ) {
      this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات", "خطأ")
    }
    else if (this.account.password != this.rePassword) {
      this.utils.BasicAlert("قم بالتاكد من الرقم السرى وتاكيده", "خطأ")
    }
    else {
      this.utils.showLoading()
      this.userProvider.updateUser(this.account)
        .then(
          () => {
            this.utils.hideLoading()
            this.navCtrl.setRoot(UserlistPage)
          }
        )
        .catch(err => {
          this.utils.hideLoading()
          this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات", "خطأ")
        })
    }
  }
}

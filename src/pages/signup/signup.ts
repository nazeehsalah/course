import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../model/user';
import { AuthProvider } from '../../providers/auth/auth'
import { UserlistPage } from '../userlist/userlist';
import { UserProvider } from '../../providers/user/user'
import 'rxjs/Rx';
import { UtilsProvider } from '../../providers/utils/utils';
import { Observable } from 'rxjs/Rx';
import { Institutes } from '../../model/institutes';
import { InstituteProvider } from '../../providers/institute/institute';
import { Storage } from '@ionic/storage';
import { NewHomePage } from '../new-home/new-home';
import { AlertController } from 'ionic-angular';


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
  public account: User = {
    email: '',
    name: '',
    nameInEnglish: '',
    identity: '',
    password: '',
    number: '',
    myDate: 'MM/DD/YYYY',
    gender: 'm',
    company: '',
    courses: ['1'],
    role: "مستخدم"
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
    public instituteProvider: InstituteProvider,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.adminAdding = this.navParams.get("adminAdding")
    console.log(this.adminAdding)
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

  signup() {
    console.log("sign")
    if (
      this.account.company == ''
      || this.account.email == ''
      || this.account.nameInEnglish == ''
      || this.account.gender == ''
      || this.account.identity == ''
      || this.account.myDate == ''
      || this.account.name == ''
      || this.account.number == ''
      || this.account.password == ''
      || this.rePassword == ''
    ) {
      this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات", "خطأ")
    } else {
      if (this.account.password != this.rePassword) {
        this.utils.BasicAlert("قم بالتاكد من الرقم السرى وتاكيده", "خطأ")
      }
      else {
        this.utils.showLoading()
        if (this.adminAdding == undefined || this.adminAdding == false) {
          this.account.role = "مستخدم"
          this.auth.signUp(this.account)
            .then(
              () => {
                this.userProvider.adduser(this.account)
                  .then(() => {
                    this.menu.enable(true, "menu-dark")
                    this.storage.set("user", this.account)
                    this.auth.signIn(this.account).then(() => {
                      this.utils.hideLoading();
                      this.navCtrl.setRoot(NewHomePage)
                    })
                      .catch(() => {
                        this.utils.hideLoading();
                        this.utils.BasicAlert("قد حدث خطا من فضلك حاول مره اخرى", "خطا")
                      })
                  })
              }
            )
            .catch(err => {
              console.log(err)
              this.utils.BasicAlert("خطأ فى التسجيل تاكد من البريد الالكترونى والرقم السرى", "خطأ")
              this.utils.hideLoading()
            })
        } else if (this.adminAdding) {
          this.auth.signUp(this.account)
            .then(
              () => {
                this.userProvider.adduser(this.account)
                  .then(() => {
                    this.menu.enable(true, "menu-dark")
                    //this.storage.set("user", this.account)
                    this.utils.hideLoading();
                    this.navCtrl.setRoot(UserlistPage)
                  })
              }
            )
            .catch(err => {
              console.log(err)
              this.utils.BasicAlert("خطأ فى التسجيل تاكد من البريد الالكترونى والرقم السرى", "خطأ")
              this.utils.hideLoading()
            })
        }
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
  public newIns: Institutes = {
    name: '',
    nameInEnglish: ''
  }
  addInstite() {
    const prompt = this.alertCtrl.create({
      title: 'اضافه جهة عمل',
      message: "من فضلك قم بادخال جميع البيانات",
      inputs: [
        {
          name: 'name',
          placeholder: 'الاسم'
        },
        {
          name: 'englishName',
          placeholder: 'الاسم باللغه الانجليزيه'
        },
      ],
      buttons: [
        {
          text: 'خروج',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'أضافة',
          handler: data => {
            if (
              data.name!= ""
              && data.englishName != ""
            ) {
             
              this.newIns.name = data.name;
              this.newIns.nameInEnglish = data.englishName
              this.utils.showLoading()
              this.instituteProvider.addInstitute(this.newIns)
                .then(
                  () => {
                    this.utils.hideLoading();
                  },
                  error => {
                    console.log(error)
                    this.utils.BasicAlert("من فضلك حاول مرة اخرى", "خطأ")
                  }
                )
            } else {
              this.utils.BasicAlert("من فضلك قم بادخال جميع البيانات ثم حاول مره اخرى", "خطا")
            }
          }
        }
      ]
    });
    prompt.present();

  }
}

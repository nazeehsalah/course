import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase'
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';
import { NewHomePage } from '../new-home/new-home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;
  isReadyToSave: boolean;
  falsemsg: string;
  // @ViewChild(Nav) nav: Nav;
  pages: any[] = [
    { title: 'Users Lists', component: 'UsersPage' }
  ];
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  userInformation: User
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: AuthProvider,
    public utils: UtilsProvider,
    public menu: MenuController,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.storage.clear()
    this.menu.enable(false, "menu-dark")
    this.menu.enable(false, "user")
    this.form = formBuilder.group({
      user_name: ['', Validators.required],
      user_pass: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    /*this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signinErrorString = value;
    })*/

    this.falsemsg = "Welcome !";
  }

  signIn() {
    if (
      this.account.email == ''
      || this.account.password == ''
      || this.account.email == undefined
      || this.account.email == undefined
    ) {
      this.utils.BasicAlert("من فضلك قم بادخال البريد الالكترونى والرقم السرى", "خطأ")
    }
    else {
      this.utils.showLoading()
      this.auth.signIn(this.account)
        .then(
          (r) => {
            console.log(r)
            this.menu.enable(true, "menu-dark")
            // get user information
            let rootRef = firebase.database().ref("users");
            rootRef.orderByChild("email").equalTo(this.account.email).once("value")
              .then(s => {
                console.log(s.val())
                Object.keys(s.val()).forEach(k => {
                  console.log(k)
                  this.setUserInfo(s.val()[k], k)
                  //this.userInformation = s.val()[k]
                })
              }).then(() => {
                this.utils.hideLoading()
                this.storage.set('user', this.userInformation);
                this.navCtrl.setRoot(NewHomePage, { loginuser: this.userInformation })
                console.log(this.userInformation)
              })
              .catch((err) => {
                console.log(err)
                this.utils.hideLoading()
                this.utils.BasicAlert("خطا فى تسجيل الدخول", "خطا")
              })
          },
        ).catch((error) => {
          this.utils.hideLoading()
          this.utils.BasicAlert("اسم المستخدم او الرقم السرى غير صحيح", "خطأ")
        })
    }

  }
  setUserInfo(usr: User, k) {
    this.userInformation = usr
    this.userInformation.key = k
  }
  signup() {
    this.navCtrl.push(SignupPage)
  }
  forgetPassword() {
    const prompt = this.alertCtrl.create({
      title: 'تغيير الرقم السرى',
      message: "من فضلك قم بادخال بريدك الالكترونى",
      inputs: [
        {

          name: 'mail',
          placeholder: 'البريد الالكترونى'
        },
      ],
      buttons: [
        {
          text: 'غير موافق',
          handler: data => {

            console.log('Cancel clicked');
            // this.auth.resetPassword
          }
        },
        {
          text: 'موافق',
          handler: data => {
            this.utils.showLoading()
            console.log(data)
            this.auth.resetPassword(data.mail).then(
              () => {
                this.utils.hideLoading()
                this.utils.BasicAlert("تم الارسال من فضلك افحص بريدك الالكترونى", "تاكيد")
              }
            ).catch(() => {
              this.utils.hideLoading()
              this.utils.BasicAlert("حدث خطا من فضلك حاول مره اخرى", "خطأ")
            })
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present()
  }

}

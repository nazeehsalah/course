import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilsProvider } from '../../providers/utils/utils';

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
  private signinErrorString: string;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: AuthProvider,
    public utils: UtilsProvider,
    public menu : MenuController
  ) {
    this.menu.enable(false,"menu-dark")
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
            this.utils.hideLoading()
            this.menu.enable(true,"menu-dark")
            this.navCtrl.setRoot(HomePage)
          },
          (error) => {
            this.utils.hideLoading()
            this.utils.BasicAlert("اسم المستخدم او الرقم السرى غير صحيح", "خطأ")
          }
        )

    }

  }
  signup() {
    this.navCtrl.push(SignupPage)
  }

}

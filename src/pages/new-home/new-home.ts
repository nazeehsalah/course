import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserlistPage } from '../userlist/userlist';
import { AtendancePage } from '../atendance/atendance';
import { InstitutesPage } from '../institutes/institutes';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
import { UserCoursesPage } from '../user-courses/user-courses';
import { UserDetailsPage } from '../user-details/user-details';


/**
 * Generated class for the NewHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-home',
  templateUrl: 'new-home.html',
})
export class NewHomePage {
  public buttonsCommands = []
  public loginUser: User
  private adminCommands = [
    {
      commandName: " البرامج المتاحه",
      icon: "apps",
      page: HomePage
    },

    {
      commandName: "الاعضاء",
      icon: "people",
      page: UserlistPage
    },
    {
      commandName: "الحضور والانصراف",
      icon: "checkmark-circle",
      page: AtendancePage
    },
    {
      commandName: "جهات العمل",
      icon: "construct",
      page: InstitutesPage
    },
  ]
  private userCommand = [
    {
      commandName: "البرامج المتاحه",
      icon: "apps",
      page: HomePage
    },
    {
      commandName: "برامجك",
      icon: "apps",
      page: UserCoursesPage
    },
    {
      commandName: "حضور وانصراف",
      icon: "add-circle",
      page:AtendancePage
    },
    {
      commandName: "ملفك الشخصى",
      icon: "person",
      page:UserDetailsPage
    },
  ]

  public userType

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public menu: MenuController
  ) {
    this.storage.get("user").then((val) => {
      this.loginUser = val
    }).then(()=>{
      if (this.loginUser.role == "مدير") {
        this.buttonsCommands = this.adminCommands
        this.menu.enable(false, "user")
        this.menu.enable(true, "menu-dark")
      }
      else if (this.loginUser.role == "مستخدم") {
        this.buttonsCommands = this.userCommand
        this.menu.enable(true, "user")
        this.menu.enable(false, "menu-dark")
      }
    })
    /*  */
  }
  goToPage(page) {
    this.navCtrl.setRoot(page)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewHomePage');
  }
  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}

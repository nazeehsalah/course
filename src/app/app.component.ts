import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { UserlistPage } from '../pages/userlist/userlist';
import { AtendancePage } from '../pages/atendance/atendance';
import { LeavingPage } from '../pages/leaving/leaving';
import { AuthProvider } from '../providers/auth/auth';
import { InstitutesPage } from '../pages/institutes/institutes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any, icon: string }>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'الدورات المتاحه', component: HomePage, icon: "home" },
      { title: 'الاعضاء', component: UserlistPage, icon: "people" },
      { title: ' حضور او مغادره', component: AtendancePage, icon: "add-circle" },
      { title: ' الموسسات', component: InstitutesPage, icon: "home" },
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.platform.setDir('ltr', true);
    });
  }
  activePage: any;
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  checkActive(page) {
    return page == this.activePage;
  }
  logout() {
    this.auth.logout()
      .then(
        () => {
          this.rootPage = LoginPage
        },
        error => {
          console.log("error Logout" + error)
        }
      )
  }
}

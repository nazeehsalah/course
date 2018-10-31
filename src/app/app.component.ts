import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserlistPage } from '../pages/userlist/userlist';
import { AtendancePage } from '../pages/atendance/atendance';
import { AuthProvider } from '../providers/auth/auth';
import { InstitutesPage } from '../pages/institutes/institutes';
import { UserCoursesPage } from '../pages/user-courses/user-courses';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { NewHomePage } from '../pages/new-home/new-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any, icon: string }>;
  userpages: Array<{ title: string, component: any, icon: string }>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: "الصفحه الرئيسيه", component: NewHomePage, icon: "home" },
      { title: ' البرامج المتاحه', component: HomePage, icon: "apps" },
      { title: 'الاعضاء', component: UserlistPage, icon: "people" },
      { title: 'الحضور والانصراف', component: AtendancePage, icon: "add-circle" },
      { title: "جهات العمل", component: InstitutesPage, icon: "construct" },
    ];
    this.userpages = [
      { title: 'الصفحه الرئيسيه', component: NewHomePage, icon: "home" },
      { title: 'البرامج المتاحه', component: HomePage, icon: "apps" },
      { title: 'دوراتك', component: UserCoursesPage, icon: "people" },
      { title: ' حضور او انصراف', component: AtendancePage, icon: "add-circle" },
      { title: ' ملفك الشخصى', component: UserDetailsPage, icon: "person" },
    ]
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
    console.log("logout")
    this.auth.logout()
      .then(
        () => {
          this.nav.setRoot(LoginPage)
        },
        error => {
          console.log("error Logout" + error)
        }
      )
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UtilsProvider } from '../providers/utils/utils';
import { CourseProvider } from '../providers/course/course';
import { UserProvider } from '../providers/user/user';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InstituteProvider } from '../providers/institute/institute';
import { IonicStorageModule } from '@ionic/storage';
import { AttendenceProvider } from '../providers/attendence/attendence';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AddCoursePage } from '../pages/add-course/add-course';
import { AddInstitutePage } from '../pages/add-institute/add-institute';
import { ClanerPage } from '../pages/claner/claner';
import { CoureseDetailsPage } from '../pages/courese-details/courese-details';
import { CourseParticipantsPage } from '../pages/course-participants/course-participants';
import { InstituteUsersPage } from '../pages/institute-users/institute-users';
import { InstitutesPage } from '../pages/institutes/institutes';
import { LeavingPage } from '../pages/leaving/leaving';
import { SignupPage } from '../pages/signup/signup';
import { UserCoursesPage } from '../pages/user-courses/user-courses';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { AtendancePage } from '../pages/atendance/atendance';
import { UserlistPage } from '../pages/userlist/userlist';
import { NewHomePage } from '../pages/new-home/new-home';
import { AtendenceDaysPage } from '../pages/atendence-days/atendence-days';
import { DayUsersPage } from '../pages/day-users/day-users';
import { AttendeDayInfoPage } from '../pages/attende-day-info/attende-day-info';
export const firebaseConfig = {
  apiKey: "AIzaSyCrUrLt1abOBxzhv31rV3hEynjTkWzHdyA",
  authDomain: "course-center-d0ca3.firebaseapp.com",
  databaseURL: "https://course-center-d0ca3.firebaseio.com",
  projectId: "course-center-d0ca3",
  storageBucket: "course-center-d0ca3.appspot.com",
  messagingSenderId: "411719727089"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewHomePage,
    LoginPage,
    ListPage,
    AddCoursePage,
    AddInstitutePage,
    ClanerPage,
    CoureseDetailsPage,
    CourseParticipantsPage,
    InstituteUsersPage,
    InstitutesPage,
    LeavingPage,
    SignupPage,
    UserCoursesPage,
    UserDetailsPage,
    AtendancePage,
    UserlistPage,
    InstituteUsersPage,
    AtendenceDaysPage,
    DayUsersPage,
    AttendeDayInfoPage

  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewHomePage,
    LoginPage,
    ListPage,
    AddCoursePage,
    AddInstitutePage,
    ClanerPage,
    CoureseDetailsPage,
    CourseParticipantsPage,
    InstituteUsersPage,
    InstitutesPage,
    LeavingPage,
    SignupPage,
    UserCoursesPage,
    UserDetailsPage,
    AtendancePage,
    UserlistPage,
    InstituteUsersPage,
    AtendenceDaysPage,
    DayUsersPage,
    AttendeDayInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AuthProvider,
    UtilsProvider,
    CourseProvider,
    UserProvider,
    AttendenceProvider,
    InstituteProvider,
  ]
})
export class AppModule { }

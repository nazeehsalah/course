import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AddCoursePage } from '../pages/add-course/add-course';
import { CoureseDetailsPage } from '../pages/courese-details/courese-details';
import { UserlistPage } from '../pages/userlist/userlist';
import { AtendancePage } from '../pages/atendance/atendance';
import { LeavingPage } from '../pages/leaving/leaving';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UtilsProvider } from '../providers/utils/utils';
import { CourseProvider } from '../providers/course/course';
import { UserProvider } from '../providers/user/user';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { CourseParticipantsPage } from '../pages/course-participants/course-participants';
import { UserCoursesPage } from '../pages/user-courses/user-courses';
import { AttendenceProvider } from '../providers/attendence/attendence';
import { InstitutesPage } from '../pages/institutes/institutes';
import { AddInstitutePage } from '../pages/add-institute/add-institute';
import { InstituteUsersPage } from '../pages/institute-users/institute-users';
import { InstituteProvider } from '../providers/institute/institute';
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
    ListPage,
    SignupPage,
    LoginPage,
    AddCoursePage,
    CoureseDetailsPage,
    UserlistPage,
    AtendancePage,
    LeavingPage,
    UserDetailsPage,
    CourseParticipantsPage,
    UserCoursesPage,
    InstitutesPage,
    AddInstitutePage,
    InstituteUsersPage,
    InstituteUsersPage
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignupPage,
    LoginPage,
    AddCoursePage,
    CoureseDetailsPage,
    UserlistPage,
    AtendancePage,
    LeavingPage,
    UserDetailsPage,
    CourseParticipantsPage,
    UserCoursesPage,
    InstitutesPage,
    AddInstitutePage,
    InstituteUsersPage
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

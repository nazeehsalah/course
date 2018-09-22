import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { CourseParticipantsPage } from '../course-participants/course-participants';
import { Course } from '../../model/course';
import { User } from '../../model/user';
import { UtilsProvider } from '../../providers/utils/utils';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Attendence, dayinfo, usersdata, userkey } from '../../model/attendence';
import { AttendenceProvider } from '../../providers/attendence/attendence';
import * as Firebase from 'firebase'
@IonicPage()
@Component({
  selector: 'page-atendance',
  templateUrl: 'atendance.html',
})
export class AtendancePage {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  public signaturePadOptions: Object = { 'minWidth': 2, 'canvasWidth': 340, 'canvasHeight': 200 }
  public signatureImage: string;
  form: FormGroup;
  isReadyToSave: boolean;
  falsemsg: string;
  pages: any[] = [
    { title: 'Users Lists', component: 'UsersPage' }
  ];
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  public CourseInfo: Course
  public UserInfo: User
  public choicedCourse: boolean = false
  public choicedUser: boolean = false
  public showForm: boolean = true
  public userAtendeInfo: usersdata = {
    atteendSign: '', attend: false, attendTime: '',
    leaveSign: '', leaveTime: ""
  }
  dayInfo: dayinfo = {
    date: '', usersData: this.userAtendeInfo
  }
  userKey: userkey = {
    userKey: '', days: []
  }
  public attendceInfo: Attendence = {
    courseKey: '', usersKeys: []
  }
  public buttonText = "تسجيل حضور"
  public infoText = ""
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public userProvider: UserProvider,
    public modal: ModalController, public utils: UtilsProvider,
    public userProv: UserProvider, public attendProv: AttendenceProvider
  ) {
    this.form = formBuilder.group({
      user_name: ['', Validators.required],
      user_pass: ['', Validators.required]
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }
  modalCuorse
  leavOnly: boolean = false
  openChoiceCourse() {
    this.modalCuorse = this.modal.create(HomePage, { choiceCourse: true })
    this.modalCuorse.present();
    this.modalCuorse.onDidDismiss(data => {
      this.CourseInfo = data
      if (this.CourseInfo != undefined) {
        this.choicedCourse = true
        let attendenceLastTime = parseInt(this.CourseInfo.lastTime.slice(0, this.CourseInfo.lastTime.indexOf(":"))) * 60 + (parseInt(this.CourseInfo.lastTime.slice(this.CourseInfo.lastTime.indexOf(":") + 1)))
        let currentTime = new Date().getHours() * 60 + new Date().getMinutes()
        if (
          currentTime < attendenceLastTime
          && currentTime > new Date(2018, 8, 22, 18, 20).getHours() * 60 + new Date(2018, 8, 22, 18, 20).getMinutes()
        ) {
          this.infoText = "تستطيع تسجيل حضور او مغادره المتدربين"
        } else {
          this.infoText = ''
          if (
            currentTime > attendenceLastTime
            && currentTime < new Date(2018, 8, 22, 18, 10).getHours() * 60 + new Date(2018, 8, 22, 18, 10).getMinutes()
          ) {
            this.infoText = "تسطيع فقط تسجيل خروج المتدربين الذين قد حضرو اليوم فقد اغلق تسجيل الحضور لهذه الدوره"
            this.leavOnly = true
          }
          else {
            this.infoText = "لا تستطيع تسجيل حضور او مغادره المستخدمين فى هذه الدوره"
            this.choicedCourse = false
          }
        }
      } else {
        this.choicedCourse = false
      }
    })
  }
  NewAteendence: boolean = false
  newUser: boolean = false
  newDay: boolean = false
  leav: boolean = false
  choiceUser() {
    this.modalCuorse = this.modal.create(CourseParticipantsPage, { choiceUser: true, course: this.CourseInfo })
    this.modalCuorse.present()
    this.modalCuorse.onDidDismiss(data => {
      this.utils.showLoading()
      this.UserInfo = data
      if (this.UserInfo != undefined) {
        this.choicedUser = true
        Firebase.database().ref("attendence").orderByChild("courseKey").equalTo(this.CourseInfo.key).once("value").then(s => {
          Object.keys(s.val()).forEach(key => {
            this.attendceInfo.key = key
            this.attendceInfo.courseKey = s.val()[key].courseKey
            this.attendceInfo.usersKeys = s.val()[key].usersKeys
          })
        }).then(() => {
          if (this.attendceInfo != undefined) {
            for (let i = 0; i < this.attendceInfo.usersKeys.length; i++) {
              let uK = this.attendceInfo.usersKeys[i]
              if (uK.userKey == this.UserInfo.key) {
                this.newUser = false
                for (let j = 0; j < uK.days.length; j++) {
                  if (uK.days[j].date == new Date().toDateString()) {
                    this.newDay = false
                    if (uK.days[i].usersData.attend == true) {
                      this.buttonText = "تسجيل مغادره"
                      this.leav = true
                      break
                    } else if (uK.days[i].usersData.attend != true) {
                      this.utils.BasicAlert("لم يحضر هذا المستخم اليوم", "خطا")
                      break;
                    } else {
                      this.leav = false
                    }
                    break
                  } else {
                    this.newDay = true
                  }
                }
                break;
              } else {
                this.newUser = true
              }
            }
          } else {
            this.NewAteendence = true
          }
        })
          .catch(err => {
            if (this.leavOnly) {
              this.utils.BasicAlert("قد اغلق تسجيل الحضور او هذا المستخدم لم ياتى اليوم", "خطا")
              this.choicedUser = false
              this.showForm = true
              console.log(this.showForm)
            }
            else
              this.NewAteendence = true
          })
        this.showForm = false
        this.utils.hideLoading()
      } else {
        this.choicedUser = false
      }
    })
    // this.utils.hideLoading()
  }
  attende() {
    console.log(this.signaturePad.isEmpty())
    this.utils.showLoading()
    if (
      this.account.email == ''
      || this.account.password == ''
      || this.signaturePad.isEmpty()
    ) {
      this.utils.hideLoading()
      this.utils.BasicAlert("من فضلك قم بادخال الريقم السرى والبريد الالكترونى الخاص بك وتوقيعك", "خطأ")
    } else {
      if (this.account.email == this.UserInfo.email && this.account.password == this.UserInfo.password) {
        this.navgiteBetweenFunctions()
      } else {
        this.utils.hideLoading()
        this.utils.BasicAlert("خطا فى البريد الالكترونى او الرقم السرى", "خطأ")
      }
    }
  }
  drawClear() {
    this.signaturePad.clear();
  }
  navgiteBetweenFunctions() {
    if (this.NewAteendence) {
      this.creatnewAttendence()
    }
    else if (this.newUser) {
      this.createNewUserAttendence()
    }
    else if (this.newDay) {
      this.addNewDay()
    }
    else if (this.leav) {
      this.leaveFunction()
    }
    this.utils.hideLoading()
    this.utils.BasicAlert("تمت عمليه تسجيل الحضور او المغادره بنجاح", "معلومه")
    this.navCtrl.setRoot(HomePage)
  }
  leaveFunction() {
    for (let i = 0; i < this.attendceInfo.usersKeys.length; i++) {
      let k = this.attendceInfo.usersKeys[i]
      if (k.userKey = this.UserInfo.key) {
        for (let j = 0; j < k.days.length; j++) {
          if (k.days[j].date == new Date().toDateString()) {
            this.signatureImage = this.signaturePad.toDataURL()
            this.userProv.uploadImage(this.signatureImage, this.UserInfo, "LeaveSigns/")
              .then(() => {
                this.userProv.getImageURl("LeaveSigns/", this.UserInfo.identity + this.userProv.uploadTime)
                  .then(url => {
                    k.days[j].usersData.leaveSign = url
                  }).then(() => {
                    k.days[j].usersData.leaveTime = new Date().toLocaleString()
                    this.attendProv.addDay(this.attendceInfo)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
              .catch(err => {
                console.log(err)
              })

            break
          }
        }
        break
      }
    }
  }
  addNewDay() {
    this.dayInfo.date = new Date().toDateString()
    this.signatureImage = this.signaturePad.toDataURL()
    this.userProv.uploadImage(this.signatureImage, this.UserInfo, "attendecneSigns/")
      .then(() => {
        this.userProv.getImageURl("attendecneSigns/", this.UserInfo.identity + this.userProv.uploadTime)
          .then(url => {
            this.dayInfo.usersData.atteendSign = url
          }).then(() => {
            this.dayInfo.usersData.leaveSign = "لم يتم تسجيل المغادره"
            this.dayInfo.usersData.attendTime = "لم يتم تسجيل المغادره"
            this.dayInfo.usersData.attend = true
            this.dayInfo.usersData.attendTime = new Date().toLocaleString()
            for (let i = 0; i < this.attendceInfo.usersKeys.length; i++) {
              if (this.attendceInfo.usersKeys[i].userKey == this.UserInfo.key)
                this.attendceInfo.usersKeys[i].days.push(this.dayInfo)
            }
            this.attendProv.addDay(this.attendceInfo)
          })
          .catch(err => {
            console.log("error in get Url")
          })
      })
      .catch(err => {
        console.log("upload Error")
      })

  }
  createNewUserAttendence() {
    this.signatureImage = this.signaturePad.toDataURL()
    this.userProv.uploadImage(this.signatureImage, this.UserInfo, "attendecneSigns/")
      .then(() => {
        this.userProv.getImageURl("attendecneSigns/", this.UserInfo.identity + this.userProv.uploadTime)
          .then(url => {
            this.userAtendeInfo.atteendSign = url
            this.userAtendeInfo.attendTime = new Date().toDateString()
            this.userAtendeInfo.attend = true
            this.userAtendeInfo.leaveSign = "لم يتم تسجيل المغاره"
            this.userAtendeInfo.leaveTime = "لم يتم تسجيل المغاره"
            this.dayInfo.usersData = this.userAtendeInfo
            this.dayInfo.date = new Date().toDateString()
            this.userKey.userKey = this.UserInfo.key
            this.userKey.days.push(this.dayInfo)
            this.attendceInfo.usersKeys.push(this.userKey)
            this.attendProv.addDay(this.attendceInfo)
          })
          .catch(err => {
            console.log("error in get Url")
          })
      })
      .catch(err => {
        console.log("upload Error")
      })
  }
  creatnewAttendence() {
    this.signatureImage = this.signaturePad.toDataURL()
    this.userProv.uploadImage(this.signatureImage, this.UserInfo, "attendecneSigns/")
      .then(() => {
        this.userProv.getImageURl("attendecneSigns/", this.UserInfo.identity + this.userProv.uploadTime)
          .then(url => {
            this.userAtendeInfo.atteendSign = url
            this.userAtendeInfo.attendTime = new Date().toDateString()
            this.userAtendeInfo.attend = true
            this.userAtendeInfo.leaveSign = "لم يتم تسجيل المغاره"
            this.userAtendeInfo.leaveTime = "لم يتم تسجيل المغاره"
            let date = new Date
            this.dayInfo.date = new Date().toDateString()
            this.dayInfo.usersData = this.userAtendeInfo
            this.userKey.userKey = this.UserInfo.key
            this.userKey.days.push(this.dayInfo)
            this.attendceInfo.courseKey = this.CourseInfo.key
            this.attendceInfo.usersKeys.push(this.userKey)
            this.attendProv.attendeUser(this.attendceInfo)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log("upload Error")
      })
  }

}
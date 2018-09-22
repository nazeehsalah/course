import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Course } from '../../model/course';

/**
 * Generated class for the CoureseDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-courese-details',
  templateUrl: 'courese-details.html',
})
export class CoureseDetailsPage {
  public course:Course={
    name:'',
    code:'',
    desc:"",
    startDate:"",
    endDate:'',
    dayAbsance:0,
    lastTime:'',
    type:"free",
    users:["teste","eiru","jfdk","fjdh",'sdhfj',"hsdfj","dshj","hfdsj","hjfd","jgfs"]
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    this.course=this.navParams.get("course")
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }
}

import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';


/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  private loadingObj
  constructor(
    public alertCtrl: AlertController,
    public loading: LoadingController
  ) {
  }
  BasicAlert(message, title) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['تم']
    });
    alert.present();
  }
  showLoading() {
    this.loadingObj = this.loading.create({
      content: 'انتظر'
    });

    this.loadingObj.present();
  }
  hideLoading() {
    this.loadingObj.dismiss()
  }

}

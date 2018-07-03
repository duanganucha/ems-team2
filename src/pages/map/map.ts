import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  item;
  currentLatitude;
  currentLongitude;

  constructor(
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private launchNavigator: LaunchNavigator
  ) {
    this.item = navParams.get('item')
    console.log(this.item.report_locationDetail)
  }

  ionViewDidLoad() {
    this.presentToast();
    this.getLocation();
    }
    
    getLocation() {
      const loader = this.loadingCtrl.create({
        content: 'Load location...',
        spinner: 'dots'
      });
      loader.present();
  
      this.geolocation.getCurrentPosition().then((resp) => {
        this.currentLatitude = resp.coords.latitude
        this.currentLongitude = resp.coords.longitude
        loader.dismiss();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

    openNavigator() {

      let options: LaunchNavigatorOptions = {
        start: [this.currentLatitude, this.currentLongitude]
      };
  
      this.launchNavigator.navigate([this.item.report_location.lat,this.item.report_location.lng], options)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
  
    }
  

    presentToast() {
      let toast = this.toastCtrl.create({
        message: `สถานที่เกิดเหตุ : ${this.item.report_locationDetail}`,
        showCloseButton: true,
        closeButtonText: 'ปิด'
      });
      toast.present();
    }

}

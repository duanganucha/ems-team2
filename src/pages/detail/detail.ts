import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { MapPage } from '../map/map';
import { VitalsignPage } from '../vitalsign/vitalsign';
import { StatusPage } from '../status/status';
import { AngularFireObject, AngularFireDatabase } from '../../../node_modules/angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  itemRef: AngularFireObject<any>;
  key;
  item;
  constructor(
    private callNumber: CallNumber,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB : AngularFireDatabase
  ) 
    {
     this.key = this.navParams.get('item');
     this.key = this.key.key
     this.getData()
  }

  getData() {
    this.itemRef = this.afDB.object(`requests/${this.key}`);
    this.itemRef.snapshotChanges().subscribe(action => {
      this.item = action.payload.val();
      this.item.key = action.key
      console.log(this.item)
    });

  }
  

  openMap(){
    console.log(this.item)
    this.navCtrl.push(MapPage,{ item : this.item });
  }


  onCallPhone(){
    console.log(this.item.report_telNumber)
    this.callNumber.callNumber(this.item.report_telNumber, true)
  }

  openVitalSign(item){
    this.navCtrl.push(VitalsignPage, {item})
  }

  openStatusPage(item){
    console.log(item)
    this.navCtrl.push(StatusPage, {item})
  }

}

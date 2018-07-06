import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DispatchClass } from '../../app/interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { MapPage } from '../map/map';
import { VitalsignPage } from '../vitalsign/vitalsign';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  item: DispatchClass;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase
  ) {

    this.item = this.navParams.get('item');
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }


  time_depart: boolean
  time_departUpdate(event) {
    this.time_depart = event;
    var date = Date.now();
    const itemsRef = this.afDB.list('requests')
    itemsRef.update(this.item.key, { time_depart : date , missionStatus : 'ออกจากฐาน'} ) ;
  }

  time_arrive_scene: boolean
  time_arrive_sceneUpdate(event) {
    this.time_arrive_scene = event;
    var date = Date.now();
    const itemsRef = this.afDB.list('requests')
    itemsRef.update(this.item.key, { time_arrive_scene : date , missionStatus : 'ถึงที่เกิดเหตุ'} ) ;
  }

  time_leave_scene: boolean
  time_leave_sceneUpdate(event) {
    this.time_leave_scene = event;
    var date = Date.now();
    const itemsRef = this.afDB.list('requests')
    itemsRef.update(this.item.key, { time_leave_scene : date , missionStatus : 'นำส่ง'} ) ;
  }

  time_arrive_hospital: boolean
  time_arrive_hospitalUpdate(event) {
    this.time_arrive_hospital = event;
    var date = Date.now();
    const itemsRef = this.afDB.list('requests')
    itemsRef.update(this.item.key, { time_arrive_hospital : date , missionStatus : 'ถึงรพ'} ) ;
  }

  time_arrive_end: boolean
  time_arrive_endUpdate(event) {
    this.time_arrive_end = event;
    var date = Date.now();
    const itemsRef = this.afDB.list('requests')
    itemsRef.update(this.item.key, { time_arrive_end : date , missionStatus : 'กลับถึงฐาน' } ) ;
  }

  openVitalSign(item){
    this.navCtrl.push(VitalsignPage,{item : item })
  }

  openMap(){
    console.log(this.item)
    this.navCtrl.push(MapPage,{ item : this.item });
  }


}



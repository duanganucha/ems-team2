import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DispatchClass } from '../../app/interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { MapPage } from '../map/map';
import { VitalsignPage } from '../vitalsign/vitalsign';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';

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

  michiganForm : FormGroup;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase,
    private builder : FormBuilder
  ) {

    this.item = this.navParams.get('item');
    console.log(this.item)

    this.michiganForm = this.builder.group({
      km_start : [this.item.km_start],
      km_depart :[this.item.km_depart],
      km_hospital : [this.item.km_hospital],
      km_end : [this.item.km_end]
    })

  }

  onSendMichigan(){
    const itemsRef = this.afDB.list('requests')
    itemsRef.update( this.item.key , this.michiganForm.value );
  }


  time_depart: boolean
  time_departUpdate(event) {
    console.log(event)
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



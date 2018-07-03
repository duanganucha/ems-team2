import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/Rx'

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  key_team_number_ambulance = '';

  itemRef: AngularFireObject<any>;
  item;
  id = '';

  constructor(
    public afDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {

    this.onLoadKey();
    this.getData();

  }

  getData() {
    this.itemRef = this.afDB.object(`teams/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {
      this.item = action.payload.val();
      console.log(this.item)
    });

  }

  onSubmit() {
    console.log(this.key_team_number_ambulance)
    this.storage.set('key', this.key_team_number_ambulance);
    this.key_team_number_ambulance = '';

    this.onLoadKey();
  }

  onLoadKey() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.storage.get('key').then((val) => {
      this.id = val
      setTimeout(() => {
        this.getData()
        loading.dismiss();
        this.checkStatus();
      }, 3000);
    });
  }

  checkStatus() {
    setTimeout(() => {
      if (this.item.status == 'isReady') {
        this.statusToggle = true
        this.status = "พร้อม"

      } else {
        this.statusToggle = false
        this.status = "ไม่พร้อม"
      }
    }, 1000);

  }

  statusToggle : boolean;
  status = '...';

  updateStatus(event){
    this.statusToggle = event;
    if(this.statusToggle == true ){
      console.log(this.statusToggle)
      const itemsRef = this.afDB.list('teams');
      itemsRef.update( this.id , { status :'isReady'} );
    }else{
      console.log(this.statusToggle)

      const itemsRef = this.afDB.list('teams');
      itemsRef.update( this.id ,{ status : 'UnReady' } );
    }
    this.getData()
    // this.statusToggle = event;
    // if(this.statusToggle == true ){
    //   this.status = "พร้อม"
    // }else{
    //   this.status = "ไม่พร้อม"
    // }
  }

}



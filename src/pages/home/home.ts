import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/Rx'

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { DispatchClass } from '../../app/interface'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  key_team_number_ambulance = '';
  itemRef: AngularFireObject<any>;
  item : DispatchClass;
  id = '-LDC3UAcFo6fpbQpnjME';

  constructor(
    public afDB: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {
    // const loader = this.loadingCtrl.create({
    //   content: 'กำลังโหลดข้อมูล...',
    // });
   
    this.itemRef = afDB.object(`teams/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {

      this.item = action.payload.val();
      console.log(this.item)
    
    });


    //  this.item.subscribe(snapshots => {
    //   loader.dismiss();
    // },(err) => {console.warn(err);}
    // )

  }

  onSubmit(){
    console.log(this.key_team_number_ambulance)
    this.key_team_number_ambulance = '';

  }

}



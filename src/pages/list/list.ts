import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/Rx'

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DetailPage } from '../detail/detail';

import { DispatchClass } from '../../app/interface'


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  items: Observable<DispatchClass[]>;
  itemsRef: AngularFireList<any>;

  constructor(
    public afDB: AngularFireDatabase,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    const loader = this.loadingCtrl.create({
      content: 'กำลังโหลดข้อมูล...',
    });
    loader.present();
    this.itemsRef = afDB.list('requests');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    loader.dismiss();
  }

  onDetailView(item) {
    this.navCtrl.push(DetailPage, { item })
  }

}



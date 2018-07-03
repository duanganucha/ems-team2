import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { DetailPage } from '../pages/detail/detail';
import { MapPage } from '../pages/map/map';

import { AgmCoreModule } from '@agm/core';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { VitalsignPage } from '../pages/vitalsign/vitalsign';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    MapPage,
    VitalsignPage
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCF3aH2Bk1v1-AOIaeDWFXzfsNjK0dh558'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    MapPage,
    VitalsignPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Geolocation,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

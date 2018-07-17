import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DispatchClass } from '../../app/interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the VitalsignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vitalsign',
  templateUrl: 'vitalsign.html',
})
export class VitalsignPage {
  segment ;
  item : DispatchClass;
  
  base64Image: string = 'assets/imgs/camera.jpg';
  imageDisplay: string;

  private formVitalSign : FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private builder: FormBuilder,
    private afDB: AngularFireDatabase,
    private camera: Camera,


  ) {

    this.segment = 'first';

    this.item = this.navParams.get('item');
    console.log(this.item.key)

    this.formVitalSign = this.builder.group({
      vitalsign1_GSC : [this.item.vitalsign1_GSC],
      vitalsign1_pupil : [this.item.vitalsign1_pupil],
      vitalsign1_BP_Diastolic : [this.item.vitalsign1_BP_Diastolic],
      vitalsign1_BP_Systolic : [this.item.vitalsign1_BP_Systolic],
      vitalsign1_pulse : [this.item.vitalsign1_pulse],
      vitalsign1_RR : [this.item.vitalsign1_RR],
      vitalsign1_symptom_first : [this.item.vitalsign1_symptom_first],
      vitalsign1_DTX : [this.item.vitalsign1_DTX],

      vitalsign2_GSC : [this.item.vitalsign2_GSC],
      vitalsign2_pupil : [this.item.vitalsign2_pupil],
      vitalsign2_BP_Diastolic : [this.item.vitalsign2_BP_Diastolic],
      vitalsign2_BP_Systolic : [this.item.vitalsign2_BP_Systolic],
      vitalsign2_pulse : [this.item.vitalsign2_pulse],
      vitalsign2_RR : [this.item.vitalsign2_RR],
      vitalsign2_symptom_second : [this.item.vitalsign2_symptom_second],
      vitalsign2_DTX : [this.item.vitalsign2_DTX]
    })
  }

  onSendVitalSign(){
    console.log(this.formVitalSign.value)

    const itemsRef = this.afDB.list('requests');
    itemsRef.update( this.item.key , this.formVitalSign.value );


  }
  segmentChanged(event){
    console.log(event)
    console.log(this.segment)
  }

  onUploadImage(){
    const itemsRef = this.afDB.list('requests');
    itemsRef.update( this.item.key , { patient_image_ByTeam : this.base64Image } );
  }

  OnTakePhoto() {

    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData)

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.item.report_image = this.base64Image;
      console.log(this.base64Image)

      this.imageDisplay = this.base64Image;
    }, (err) => {
      // Handle error
    });
  }

}

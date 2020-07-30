import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-detallenotificacio',
  templateUrl: './detallenotificacio.page.html',
  styleUrls: ['./detallenotificacio.page.scss'],
})
export class DetallenotificacioPage implements OnInit {

  @Input() notificacion: Object;

  headers: any;
  constructor( public navParams: NavParams, public modalCtrl: ModalController, private http: HttpClient, private storage: Storage) {
    console.log(this.navParams.get('notificacion'))
    this.notificacion = this.navParams.get('notificacion')
    console.log(this.notificacion)
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.storage.get('tok').then(val => {
          let data = [{
            "IdGoogle": usuario.uid
          }]
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val

          });
          let datos = [{
            "IDGOOGLE" : usuario.uid,
            "IDNOTIFICACION" : this.notificacion['IDNOTIFICACION']
          }]
          this.http.put(environment.server+'/leeNotificacion',datos,{observe: 'response', headers: this.headers}).subscribe((n: any) => {

          })

        })
      }
    })

  }

  ngOnInit() {
  }
back(){
  this.modalCtrl.dismiss({
  'dismissed': true
});
}
}

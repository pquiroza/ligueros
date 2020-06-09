import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavParams } from '@ionic/angular'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detallenoticia',
  templateUrl: './detallenoticia.page.html',
  styleUrls: ['./detallenoticia.page.scss'],
})
export class DetallenoticiaPage implements OnInit {

  headers: any;
  idn: any;
  noticia: any;
  fotos: any;
  constructor(public navParams: NavParams, private http: HttpClient, private storage: Storage, private modal: ModalController) {
    this.noticia = []
  this.idn = this.navParams.get('idn');
  console.log(this.navParams.get('idn'));
      firebase.auth().onAuthStateChanged(usuario => {
        if (usuario){

          this.storage.get('tok').then(val => {
            this.headers = new HttpHeaders({
              'Authorization': "Bearer "+val

            });
            this.http.get(environment.server+'/detalleNoticia?IdNoticia='+this.idn,{headers: this.headers}).subscribe((n: any) => {
              console.log(n[0].URLs)
              this.noticia = n[0];
              this.fotos = n[0].URLs;
            })
          })
        }
      })


   }

  ngOnInit() {
  }
close(){
  this.modal.dismiss()

}
}

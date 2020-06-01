import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as firebase from "firebase";

import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  headers: any;
  calendario: any;
  constructor(private http: HttpClient, private storage: Storage) {

    firebase.auth().onAuthStateChanged(usuario => {
      if(usuario){
        this.storage.get('tok').then(val => {
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val
          });
          this.http.get(environment.server+'/calendarioUsuario?IdGoogle='+usuario.uid,{headers:this.headers}).subscribe((e: any) => {
            this.calendario = e;
          })

        })
      }
    })

  }

  ngOnInit() {
  }

}

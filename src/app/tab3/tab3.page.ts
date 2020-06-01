import { Component } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
headers: any;
favoritos: any;

  constructor(private router: Router, private afs: AngularFirestore, private http: HttpClient, private storage: Storage) {
    console.log("TAB3")
    firebase.auth().onAuthStateChanged(usuario => {
      if(usuario){
        this.storage.get('tok').then(val => {
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val

          });
          this.http.get(environment.server+'/favoritos?IdGoogle='+usuario.uid,{headers:this.headers}).subscribe((e: any) => {
            console.log(e)
            this.favoritos = e;
          })
        })

      }
    })


  }

  detalleEquipo(ide){
    this.router.navigate(['/detalleequipo'],{queryParams:{ide:ide}})
  }

}

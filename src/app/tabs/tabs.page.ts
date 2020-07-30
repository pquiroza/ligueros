import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  numnotificaciones: any;
  headers: any;
  constructor(private router: Router, private http: HttpClient, private storage: Storage) {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.storage.get('tok').then(val => {

          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val

          });

          this.http.get(environment.server+'/cantNotificaciones?IdGoogle='+usuario.uid, {headers: this.headers}).subscribe((n: any) => {
            this.numnotificaciones = n
          })
        })





      }
    })


    this.router.navigate(['/tabs/tab1'])


  }

}

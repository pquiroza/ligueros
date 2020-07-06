import { Component } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Campeonato } from '../campeonato';
import { Storage } from '@ionic/storage';
import { EventsService } from '../events.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

export interface CampeonatoId extends Campeonato{
  id:string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


campeonatos: any[] = [];
favoritos: any[] = [];
favs: any[] = [];
headers; any
  constructor(private router: Router, private afs: AngularFirestore, private http: HttpClient, private storage: Storage, private events: EventsService) {

    this.events.subscribe('unfav:campeonato', (data: any) => {
      console.log("DATOS DE EVENTO")
      this.getDatos().then(r => {

      })
    })


  }


  detalleCampeonato(idc){
    console.log(idc);
    this.router.navigate(['/detallecampeonato'],{queryParams:{idc:idc}})
  }

  ionViewDidEnter(){
    this.campeonatos = []

    this.getDatos().then(u => {
      console.log(u)

    })


  }
fav(idc){
  firebase.auth().onAuthStateChanged(usuario => {
    if (usuario){
      let data = [{
        "IdCampeonato": idc,
        "IdGoogle": usuario.uid
      }]
      this.http.post(environment.server+'/sigue',data,{observe:'response',headers: this.headers}).subscribe(r => {
        console.log(r);
        this.getDatos().then(u => {

        })
      })
    }
  })
}

unfav(idc){
  firebase.auth().onAuthStateChanged(usuario => {
    if (usuario){
      let data = [{
        "IdCampeonato": idc,
        "IdGoogle": usuario.uid
      }]
      console.log(this.headers)


      this.http.delete(environment.server+'/sigue?IdGoogle='+usuario.uid+'&IdCampeonato='+idc,{observe:'response',headers: this.headers}).subscribe(r => {
        this.getDatos().then(u => {
          console.log(u)

        })
      })
    }
  })
}


getDatos(){
  return new Promise((resolve,reject) => {
    firebase.auth().onAuthStateChanged(usuario => {
if(usuario){
              this.storage.get('tok').then(val => {
                this.headers = new HttpHeaders({
                  'Authorization': "Bearer "+val

                });
                this.http.get(environment.server+'/allCampeonatos?IdGoogle='+usuario.uid,{headers:this.headers}).subscribe((u: any) => {
                    console.log(u)
                    this.favoritos = u[0]
                    this.campeonatos = u[1]
                    resolve()

                })

              })





      }
    })

  })
}
}

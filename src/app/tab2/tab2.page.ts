import { Component } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Campeonato } from '../campeonato';
import { Storage } from '@ionic/storage';


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
  constructor(private router: Router, private afs: AngularFirestore, private http: HttpClient, private storage: Storage) {




  }


  detalleCampeonato(idc){
    console.log(idc);
    this.router.navigate(['/detallecampeonato'],{queryParams:{idc:idc}})
  }

  ionViewDidEnter(){
    this.campeonatos = []
      firebase.auth().onAuthStateChanged(usuario => {
if(usuario){
                this.storage.get('tok').then(val => {
                  this.headers = new HttpHeaders({
                    'Authorization': "Bearer "+val

                  });
                  this.http.get(environment.server+'/allCampeonatos',{headers:this.headers}).subscribe((u: any) => {

                      u.forEach(c => {
                        console.log(c)
                        this.campeonatos.push(c)
                      })

                  })
                  this.http.get(environment.server+'/sigue?IdGoogle='+usuario.uid,{headers: this.headers}).subscribe((f: any) => {
                    console.log(f)
                    this.favoritos = f;
                  })
                })





        }
      })



  }

}

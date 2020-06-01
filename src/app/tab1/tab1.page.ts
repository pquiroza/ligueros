import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Usuario  } from '../usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
  sigue: any;
  noticias: any;
  headers; any
  constructor(private router: Router, private afs: AngularFirestore,private http: HttpClient, private storage: Storage) {
  this.noticias = []

    firebase.auth().onAuthStateChanged(usuario => {

      console.log(usuario)


        this.storage.get('tok').then(val => {
          console.log(val);
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val

          });
          console.log(this.headers)


                this.http.get(environment.server+'/noticias?idCampeonato=1',{headers: this.headers}).subscribe(camp => {
                  console.log(camp)
                  this.noticias = camp
                })

        })

        //let header = new Headers({ 'Authorization': `Bearer ${token}` });





    })


  }
ionViewDidEnter(){









/*
        this.http.get(environment.server+'/noticiasApp?IdGoogle='+usuario.uid).subscribe((noticias: any) => {
          this.noticias = noticias;

        })
*/




}
}

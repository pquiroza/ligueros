import { Component } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Campeonato } from '../campeonato';


import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface CampeonatoId extends Campeonato{
  id:string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public campeonatoCollection: AngularFirestoreCollection<Campeonato>;
campeonatos: Campeonato[] = [];

  constructor(private router: Router, private afs: AngularFirestore, private http: HttpClient) {

    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.http.get('http://190.101.192.149/ligueros/api/getcampeonatos').subscribe((result: any[] )=> {

          console.log(result)
          result.forEach(r => {

               let campeonato: Campeonato = {id:r[0],nombre:r[1],estado:r[2],fechainicio:r[3],tipo:r[5]}
               console.log(campeonato)
                this.campeonatos.push(campeonato)
          })

        })
        /*
        this.campeonatoCollection = this.afs.collection<Campeonato>('Campeonatos');
        this.campeonatos = this.campeonatoCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          console.log(data);
          const id = a.payload.doc.id;
          return{id, ...data}
        })))
        */
      }
      else{

      }
    })


  }

  detalleCampeonato(idc){
    console.log(idc);
    this.router.navigate(['/detallecampeonato'],{queryParams:{idc:idc}})
  }

}

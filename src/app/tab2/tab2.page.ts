import { Component } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Campeonato } from '../campeonato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
  campeonatos: Observable<CampeonatoId[]>;

  constructor(private router: Router, private afs: AngularFirestore) {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.campeonatoCollection = this.afs.collection<Campeonato>('Campeonatos');
        this.campeonatos = this.campeonatoCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          console.log(data);
          const id = a.payload.doc.id;
          return{id, ...data}
        })))
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

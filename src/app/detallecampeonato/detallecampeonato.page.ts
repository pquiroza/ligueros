import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from "firebase";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campeonato } from '../campeonato';

@Component({
  selector: 'app-detallecampeonato',
  templateUrl: './detallecampeonato.page.html',
  styleUrls: ['./detallecampeonato.page.scss'],
})
export class DetallecampeonatoPage implements OnInit {
    public campeonatoDocument: AngularFirestoreDocument<Campeonato>;
    idcampeonato: any;
    campeonato: any;
  constructor(private afs: AngularFirestore, private router: Router, public route: ActivatedRoute) {
    this.campeonato = [];
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.route.queryParams.subscribe(params => {
          this.idcampeonato = params['idc'];
          this.campeonatoDocument = this.afs.doc<Campeonato>('Campeonatos/'+this.idcampeonato);
          this.campeonatoDocument.valueChanges().subscribe(campeonato => {
            this.campeonato = campeonato;
          })
        })
      }
      else{

      }
    })

   }

  ngOnInit() {
  }

}

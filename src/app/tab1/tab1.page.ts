import { Component } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Usuario  } from '../usuario';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(private router: Router, private afs: AngularFirestore) {

    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.usuariosCollection = this.afs.collection('Usuarios');
        this.usuariosCollection.doc(usuario.uid).snapshotChanges().subscribe(data => {
          if (data.payload.exists){
            console.log("YA EXISTE")
            console.log(data.payload.data());
          }
          else
        {
          console.log(usuario);
        //  this.router.navigate(['/tabs/perfil']);
          console.log("NO EXISTE CTM");
        }
        })
      }
      else{
        this.router.navigate(['/login']);
      }
    })


  }

}

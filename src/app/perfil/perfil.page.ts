import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Usuario  } from '../usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  public perfilForm: FormGroup;
  public submitAttempt: boolean = false;
  public usuariosCollecion: AngularFirestoreCollection;
  us: any;
  constructor(private router: Router, public formBuilder: FormBuilder, private afs: AngularFirestore, public alertCtrl: AlertController,private http: HttpClient) {
    this.usuario = [];
    this.us = [];



    firebase.auth().onAuthStateChanged(usuario => {
      if (!usuario){
        this.router.navigate(['/login']);
      }
      else{
        this.http.get('http://190.101.192.149/ligueros/api/getdatosusuario?id='+usuario.uid).subscribe(result => {

          this.us = result;
          console.log(this.us);
        })


      }
    })



    this.perfilForm = formBuilder.group({
        telefono:['',Validators.compose([Validators.required])],
       nombre:['', Validators.compose([Validators.required])],
       rut:['',Validators.compose([Validators.required])],
       correo:['',Validators.compose([Validators.required])],
       fechanacimiento:['',Validators.compose([Validators.required])]
    });






   }

  ngOnInit() {
  }
updatePerfil(){
var user = firebase.auth().currentUser;
  if (!this.perfilForm.valid){
    this.submitAttempt = true;

  }
  else{

    console.log(this.perfilForm.value)
    this.http.get('http://190.101.192.149/ligueros/api/actualizausuario?id='+user.uid+'&telefono='+this.perfilForm.value.telefono+'&nombre='+this.perfilForm.value.nombre+'&rut='+this.perfilForm.value.rut+'&fechanacimiento='+this.perfilForm.value.fechanacimiento+'&correo='+this.perfilForm.value.correo).subscribe(result => {
      console.log(result);
    })



    /*
    var user = firebase.auth().currentUser;
    console.log(user);
    user.updateEmail(this.perfilForm.value.correo);
    user.updateProfile({
      displayName: this.perfilForm.value.nombre
    })
    */
//poner alerta aca
}
}

async muestraAlerta(){
  const alerta = await this.alertCtrl.create({
    header: "Perfil actualizado",
    subHeader: "Datos actualizados",
    message: "Su perfil ha sido actualizado correctamente",
    buttons: [{
      text: 'Cerrar',
      role: 'Cancel'
    }]
  });
  await alerta.present();
}
}

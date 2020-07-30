import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Usuario  } from '../usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { DetallenotificacioPage } from '../detallenotificacio/detallenotificacio.page';
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
  headers: any;
  opcion: any;
  notificaciones: any;
  numnotificaciones: any;
  constructor(private router: Router, public formBuilder: FormBuilder, private afs: AngularFirestore, public alertCtrl: AlertController,private http: HttpClient, private storage: Storage, private modalController: ModalController) {
    this.usuario = [];
    this.us = [];
    this.opcion='perfil';
    this.notificaciones = [];

    firebase.auth().onAuthStateChanged(usuario => {
      if (!usuario){
        this.router.navigate(['/login']);
      }
      else{
        this.storage.get('tok').then(val => {
          let data = [{
            "IdGoogle": usuario.uid
          }]
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val

          });

          console.log(usuario.uid)
          this.http.get(environment.server+'/usuario?idGoogle='+usuario.uid,{headers: this.headers}).subscribe((u: any) => {
              this.us = u[0]
              console.log(this.us)


          })
          this.getNumNotifiacciones().then(n => {
            console.log(n)
          this.numnotificaciones = n;
          })

          this.getNotificaciones().then(n => {

          })

        })


      }
    })



    this.perfilForm = formBuilder.group({
        Telefono:['',Validators.compose([Validators.required])],
       Nombre:['', Validators.compose([Validators.required])],
       Rut:['',Validators.compose([Validators.required])],
       Correo:['',Validators.compose([Validators.required])]
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
    let data = [{
      "IdGoogle": user.uid
    }]
    console.log(user.uid)
    this.http.get(environment.server+'/usuario?idGoogle='+user.uid).subscribe((u: any) => {
      console.log(u.length)
        if (u.length!=0){
          console.log("entro")
          let datos = [
            {
                "IdGoogle": user.uid,
                "Nombre": this.perfilForm.value.Nombre,
                "Correo": this.perfilForm.value.Correo,
                "Telefono": this.perfilForm.value.Telefono,
                "Rut": this.perfilForm.value.Rut,
                "Contrasena": "Dummy"
            }
          ]
            this.http.put(environment.server+'/usuario',datos,{observe: 'response'}).subscribe((result:any) => {
              console.log(result)
            })
        }
        else{
          console.log("To new")
          let datos = [
            {
                "IdGoogle": user.uid,
                "Nombre": this.perfilForm.value.Nombre,
                "Correo": this.perfilForm.value.Correo,
                "Telefono": this.perfilForm.value.Telefono,
                "Rut": this.perfilForm.value.Rut,
                "Contrasena": "Dummy"
            }
          ]
          this.http.post(environment.server+'/usuario',datos,{observe: 'response'}).subscribe((result:any) => {
            console.log(result)
          })
        }
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

muestra(opcion){
  console.log(opcion)
  this.opcion = opcion;
}

modifica(a,b){
  console.log(a.detail.checked)
  console.log(b)


  firebase.auth().onAuthStateChanged(usuario => {
    if (usuario){
      this.storage.get('tok').then(val => {
        this.headers = new HttpHeaders({
          'Authorization': "Bearer "+val

        });
        let valor = 0;
        if (a.detail.checked){
          valor=1
        }
        else{
          valor=0
        }
        let datos =  [
          {
            "IDGOOGLE": usuario.uid,
            "NOTIFICACION": b,
            "VALOR": valor
          }
        ]

        console.log(this.headers)
        this.http.put(environment.server+'/confNotificacion',datos,{observe: 'response', headers: this.headers}).subscribe(a => {
          console.log(a)
        })

      })
    }
  })
}

getNotificaciones(){
  return new Promise((resolve,reject) => {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.http.get(environment.server+'/notificaciones?IdGoogle='+usuario.uid,{headers:this.headers}).subscribe((n: any) => {
          console.log(n)
          this.notificaciones = n;
          resolve()
        })
      }
    })
  })
}

getNumNotifiacciones(){
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.http.get(environment.server+'/cantNotificaciones?IdGoogle='+usuario.uid, {headers: this.headers}).subscribe((n: any) => {
          console.log(n)
          resolve(n)
        })
      }
    })
  })
}
async detalleNotificacion(notificacion){
  console.log(notificacion)
  const modal = await this.modalController.create({
    component: DetallenotificacioPage,
    componentProps:{
      'notificacion': notificacion
    }

  });
  return await modal.present();
}

}

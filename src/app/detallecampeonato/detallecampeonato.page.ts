import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from "firebase";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campeonato } from '../campeonato';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detallecampeonato',
  templateUrl: './detallecampeonato.page.html',
  styleUrls: ['./detallecampeonato.page.scss'],
})
export class DetallecampeonatoPage implements OnInit {
    public campeonatoDocument: AngularFirestoreDocument<Campeonato>;
    idcampeonato: any;
    campeonato: any;
    equipos: any;
    calendario: any;
    sigue: any;
    idc: any
    headers: any;
    opcion: any;
    constructor(private afs: AngularFirestore, private router: Router, public route: ActivatedRoute,private http: HttpClient, private storage: Storage) {
    this.campeonato = [];
    this.opcion = 'tabla'
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.route.queryParams.subscribe(params =>{
          console.log(params.idc)
          this.idc = params.idc
          let data = [{
            "IdCampeonato": params.idc
          }]

          this.storage.get('tok').then(val => {
            this.headers = new HttpHeaders({
              'Authorization': "Bearer "+val

            });

            this.http.post(environment.server+'/getCampeonatoApp',data,{observe: 'response', headers: this.headers}).subscribe((campeonato: any) => {
              this.campeonato=campeonato.body[0]
              console.log(this.campeonato)
            })
            this.http.get(environment.server+'/tablaPosicion?IdCampeonato='+params.idc, {headers:this.headers}).subscribe((equipos: any) => {
              this.equipos=equipos
              console.log(this.equipos)
            })
            this.http.get(environment.server+'/calendario?IdCampeonato='+params.idc,{headers:this.headers}).subscribe((c: any) => {
              console.log(c)
              this.calendario=c
            })
            this.http.get(environment.server+'/confirmaSigue?IdGoogle='+usuario.uid+'&IdCampeonato='+params.idc,{headers:this.headers}).subscribe(fav => {
              console.log(fav)
              this.sigue=fav;
            })
          })



        })

      }
      else{

      }
    })

   }

  ngOnInit() {
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
      })
    }
  })
}
back(){
  this.router.navigate(['/tabs/tab2'])
}
detalleEquipo(ide){
  console.log(ide)
  this.router.navigate(['/detalleequipo'],{queryParams:{ide:ide,idc:this.idc}})
}


muestra(opcion){
  console.log(opcion)
  this.opcion = opcion
}
}

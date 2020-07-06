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
import { EventsService } from '../events.service';
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
    goleadores: any;
    amonestados: any;
    suspendidos: any;
        constructor(private afs: AngularFirestore, private router: Router, public route: ActivatedRoute,private http: HttpClient, private storage: Storage, private events: EventsService) {
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

          this.getDatos(params.idc, data).then(r => {

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
        this.sigue='true'
        this.events.publish('unfav:campeonato',{
          idc:idc
        })
      })
    }
  })
}

unfav(idc){
  firebase.auth().onAuthStateChanged(usuario => {
    if(usuario){
      let data = [{
        "IdCampeonato": idc,
        "IdGoogle": usuario.uid
      }]
      this.http.delete(environment.server+'/sigue?IdGoogle='+usuario.uid+'&IdCampeonato='+idc,{observe:'response',headers: this.headers}).subscribe(r => {
        this.sigue='false'
        this.events.publish('unfav:campeonato',{
          idc: idc
        })
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

getDatos(idc,data){
  return new Promise((resolve,reject) => {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.storage.get('tok').then(val => {
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val

          });

          this.http.post(environment.server+'/getCampeonatoApp',data,{observe: 'response', headers: this.headers}).subscribe((campeonato: any) => {
            this.campeonato=campeonato.body[0]
            console.log(this.campeonato)
          })
          this.http.get(environment.server+'/tablaPosicion?IdCampeonato='+idc, {headers:this.headers}).subscribe((equipos: any) => {
            this.equipos=equipos
            console.log(this.equipos)
          })
          this.http.get(environment.server+'/calendario?IdCampeonato='+idc,{headers:this.headers}).subscribe((c: any) => {
            console.log(c)
            this.calendario=c
          })
          this.http.get(environment.server+'/confirmaSigue?IdGoogle='+usuario.uid+'&IdCampeonato='+idc,{headers:this.headers}).subscribe(fav => {
            console.log(fav)
            this.sigue=fav;
          })
          this.http.get(environment.server+'/goleadores?IdCampeonato='+idc,{headers:this.headers}).subscribe((g: any) => {
            console.log(g);
            this.goleadores = g
          })
          this.http.get(environment.server+'/amonestados?IdCampeonato='+idc,{headers:this.headers}).subscribe((a: any) => {
            console.log(a);
            this.amonestados = a;
          })
          this.http.get(environment.server+'/suspendidos?IdCampeonato='+idc,{headers: this.headers}).subscribe((s: any) => {
            console.log(s);
            this.suspendidos= s;
          })
          resolve()

        })
      }
    })
  })
}
}

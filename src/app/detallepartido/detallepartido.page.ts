import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from "firebase";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-detallepartido',
  templateUrl: './detallepartido.page.html',
  styleUrls: ['./detallepartido.page.scss'],
})
export class DetallepartidoPage implements OnInit {
idp: any;
opcion: any;
localg: any;
visitag:any;
localta: any;
visitata: any;
localtr: any;
visitatr: any;
headers: any;
general: any;
  constructor(private afs: AngularFirestore, private router: Router, public route: ActivatedRoute,private http: HttpClient, private storage: Storage) {
    this.opcion='goles';
    this.general = [];
firebase.auth().onAuthStateChanged(usuario => {
  if (usuario){
    this.route.queryParams.subscribe(params => {
        this.idp = params.idp;
        console.log(this.idp)
        this.storage.get('tok').then(val => {
          this.headers = new HttpHeaders({
            'Authorization': "Bearer "+val



        })
        this.http.get(environment.server+'/detallePartido?IdPartido='+this.idp,{headers:this.headers}).subscribe((p:any) => {
          console.log(p)
            this.general=p[0]
            this.localg=p[1][0]
            this.visitag=p[2][0]
            this.localta=p[1][1]
            this.visitata=p[2][1]
            this.localtr=p[1][2]
            this.visitatr=p[2][2]
            console.log(p[1][2])
            console.log(p[2][2])
        })
        })
    })
  }
})



   }

   back(){
     this.router.navigate(['/tabs/tab4'])
   }

   muestra(opcion){
     console.log(opcion)
     this.opcion = opcion
   }

  ngOnInit() {
  }

}

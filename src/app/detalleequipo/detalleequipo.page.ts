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
  selector: 'app-detalleequipo',
  templateUrl: './detalleequipo.page.html',
  styleUrls: ['./detalleequipo.page.scss'],
})
export class DetalleequipoPage implements OnInit {
  jugadores: any;
  equipo: any;
  sigue: any;
  calendario: any;
  idc: any;
  headers: any;
  constructor(private afs: AngularFirestore, private router: Router, public route: ActivatedRoute,private http: HttpClient, private storage: Storage) {
    this.equipo = []
      firebase.auth().onAuthStateChanged(usuario => {
        if(usuario){
          this.route.queryParams.subscribe(params => {
            this.idc = params.idc;
              console.log(params.ide)

          this.storage.get('tok').then(val => {
            this.headers = new HttpHeaders({
              'Authorization': "Bearer "+val



          })

              this.http.get(environment.server+'/jugadores?IdEquipo='+params.ide,{headers: this.headers}).subscribe((jugadores: any) => {
                console.log(jugadores);
                this.jugadores=jugadores;
              })
              this.http.get(environment.server+'/equipo?IdEquipo='+params.ide,{headers: this.headers}).subscribe(equipo => {
                console.log(equipo[0])
                  this.equipo = equipo[0];
              })
              this.http.get(environment.server+'/confirmaFavoritos?IdGoogle='+usuario.uid+'&IdEquipo='+params.ide,{headers: this.headers}).subscribe(sigue => {
                console.log(sigue)
                this.sigue=sigue;
              })
              this.http.get(environment.server+'/calendarioEquipo?IdEquipo='+params.ide,{headers: this.headers}).subscribe((calendario: any) => {
                console.log(calendario)
                this.calendario=calendario
              })
                });
          })
        }
      })
  }

  ngOnInit() {
  }

  back(){
    if (this.idc==undefined){
this.router.navigate(['/tabs/tab3'])
    }
    else{
        this.router.navigate(['/detallecampeonato'],{queryParams:{idc:this.idc}})
    }

  }

fav(ide){
  firebase.auth().onAuthStateChanged(usuario => {
    if(usuario){
      let data = [{
        "IdEquipo": ide,
        "IdGoogle": usuario.uid
      }]
      this.http.post(environment.server+'/favoritos',data,{observe:'response',headers: this.headers}).subscribe(e => {
        console.log(e)
      })
    }
  })
}

}

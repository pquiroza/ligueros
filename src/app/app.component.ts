import { Component } from '@angular/core';
import * as firebase from "firebase";

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afs: AngularFirestore,private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Entrnado");
      firebase.auth().onAuthStateChanged(usuario => {
        if (usuario){
          console.log(usuario)
        this.http.get(environment.server+'/login?IdGoogle='+sha256(usuario.uid)).subscribe((token: any) => {
          console.log(token)
          if(token == 'undefined'){
            console.log("No tengo token")
          }
          this.storage.set('tok',token.token)
         console.log(token.token)
        })
      }
      else{
        this.router.navigate(['/login'])
      }
      })




      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

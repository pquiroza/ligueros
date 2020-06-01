import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(public alertCtrl:AlertController, private router: Router,  private storage: Storage,private http: HttpClient) {



  }
  ionViewDidLoad() {
  }
  ngOnInit() {
  }
signIn(email,password){
  console.log(email);
  console.log(password);

  firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
    console.log(user)
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario){
        this.http.get(environment.server+'/login?IdGoogle='+sha256(usuario.uid)).subscribe((token: any) => {
                this.storage.set('tok',token.token)
                this.router.navigate(['/tabs'])

        })

      }




    })
  })

}






}

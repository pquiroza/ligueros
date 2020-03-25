import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(public alertCtrl:AlertController, private router: Router) {



  }
  ionViewDidLoad() {
  }
  ngOnInit() {
  }
signIn(email,password){
  console.log(email);
  console.log(password);

  firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
    firebase.auth().onAuthStateChanged(usuario => {
      this.router.navigate(['/tabs'])
    })
  })

}






}

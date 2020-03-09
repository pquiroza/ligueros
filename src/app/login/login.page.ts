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
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  ngOnInit() {
  }
signIn(celular){
  console.log(celular);
  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
const phoneNumber =  celular;
firebase.auth().signInWithPhoneNumber(celular, this.recaptchaVerifier)
  .then( confirmationResult => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
let codigo = this.muestraAlerta(celular);

console.log(codigo);

  /*
    firebase.auth().signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier).then(confirmatioResult => {

        //  confirmatioResult.confirm("1234");
    }).catch(function(error){
      console.log("NO SALE SMS")
    })
    */
})
.catch(function (error) {
  console.error("SMS not sent", error);
});


}


onSignInSubmit(appVerifier){
  const phoneNumber =  "+56956683863";
  console.log(phoneNumber);
//  const appVerifier = this.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(confirmatioResult => {
        console.log(confirmatioResult);
  }).catch(function(error){
    console.log("NO SALE SMS")
  })
}


async muestraAlerta(celular){
  const alerta = await this.alertCtrl.create({
    header: 'Verificación de Número',
    subHeader: 'Ingresa el código que recibirás por SMS',
    inputs: [
      {
        name: 'codigo',
        type: 'number',
        placeholder: 'Ingresa el código '
      }
    ],
    message: 'Ingresa el código que recibiste',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'danger'
      },
      {

        text: 'Enviar',
        cssClass: 'primary',
        handler: (alertData) => {
          console.log(alertData.codigo)

          firebase.auth().signInWithPhoneNumber(celular, this.recaptchaVerifier).then(confirmatioResult => {
console.log(confirmatioResult);
            confirmatioResult.confirm(alertData.codigo).then(r => {
              console.log(r);
              this.router.navigate(['/'])

            })




          }).catch(function(error){
            console.log("NO SALE SMS")
          })

        }
      }
    ]
  })
  await alerta.present();
}

}

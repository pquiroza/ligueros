import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { DetallenoticiaPage } from './detallenoticia/detallenoticia.page'
import { DetallenotificacioPage } from './detallenotificacio/detallenotificacio.page';
firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent,  DetallenoticiaPage, DetallenotificacioPage],
  entryComponents: [  DetallenoticiaPage, DetallenotificacioPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  HttpClientModule,

  IonicStorageModule.forRoot()
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

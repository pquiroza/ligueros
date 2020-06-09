import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallenoticiaPageRoutingModule } from './detallenoticia-routing.module';

import { DetallenoticiaPage } from './detallenoticia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallenoticiaPageRoutingModule
  ],
  declarations: [DetallenoticiaPage]
})
export class DetallenoticiaPageModule {}

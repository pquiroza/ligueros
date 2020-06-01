import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleequipoPageRoutingModule } from './detalleequipo-routing.module';

import { DetalleequipoPage } from './detalleequipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleequipoPageRoutingModule
  ],
  declarations: [DetalleequipoPage]
})
export class DetalleequipoPageModule {}

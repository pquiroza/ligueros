import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallenotificacioPageRoutingModule } from './detallenotificacio-routing.module';

import { DetallenotificacioPage } from './detallenotificacio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallenotificacioPageRoutingModule
  ],
  declarations: [DetallenotificacioPage]
})
export class DetallenotificacioPageModule {}

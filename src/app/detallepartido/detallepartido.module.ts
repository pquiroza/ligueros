import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallepartidoPageRoutingModule } from './detallepartido-routing.module';

import { DetallepartidoPage } from './detallepartido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallepartidoPageRoutingModule
  ],
  declarations: [DetallepartidoPage]
})
export class DetallepartidoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallecampeonatoPageRoutingModule } from './detallecampeonato-routing.module';

import { DetallecampeonatoPage } from './detallecampeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallecampeonatoPageRoutingModule
  ],
  declarations: [DetallecampeonatoPage]
})
export class DetallecampeonatoPageModule {}

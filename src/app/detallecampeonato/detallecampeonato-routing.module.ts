import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallecampeonatoPage } from './detallecampeonato.page';

const routes: Routes = [
  {
    path: '',
    component: DetallecampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallecampeonatoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallepartidoPage } from './detallepartido.page';

const routes: Routes = [
  {
    path: '',
    component: DetallepartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallepartidoPageRoutingModule {}

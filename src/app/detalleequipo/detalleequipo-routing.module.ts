import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleequipoPage } from './detalleequipo.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleequipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleequipoPageRoutingModule {}

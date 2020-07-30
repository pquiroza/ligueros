import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallenotificacioPage } from './detallenotificacio.page';

const routes: Routes = [
  {
    path: '',
    component: DetallenotificacioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallenotificacioPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallenoticiaPage } from './detallenoticia.page';

const routes: Routes = [
  {
    path: '',
    component: DetallenoticiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallenoticiaPageRoutingModule {}

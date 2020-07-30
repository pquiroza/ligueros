import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'detallecampeonato',
    loadChildren: () => import('./detallecampeonato/detallecampeonato.module').then( m => m.DetallecampeonatoPageModule)
  },
  {
    path: 'detalleequipo',
    loadChildren: () => import('./detalleequipo/detalleequipo.module').then( m => m.DetalleequipoPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'detallenoticia',
    loadChildren: () => import('./detallenoticia/detallenoticia.module').then( m => m.DetallenoticiaPageModule)
  },
  {
    path: 'detallepartido',
    loadChildren: () => import('./detallepartido/detallepartido.module').then( m => m.DetallepartidoPageModule)
  },
  {
    path: 'detallenotificacio',
    loadChildren: () => import('./detallenotificacio/detallenotificacio.module').then( m => m.DetallenotificacioPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

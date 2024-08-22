import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/pages/login/login.component';
import { HomeComponent } from './modules/shared/layout/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'seguridad',

        loadChildren: () =>
          import('./modules/seguridad/seguridad.module').then(
            (m) => m.SeguridadModule
          ),
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('./modules/pedidos/pedidos.module').then(
            (m) => m.PedidosModule
          ),
      },
      {
        path: 'reporte',
        loadChildren: () =>
          import('./modules/reporte/reporte.module').then(
            (m) => m.ReporteModule
          ),
      },
      {
        path: 'parametros',
        loadChildren: () =>
          import('./modules/parametros/parametros.module').then(
            (m) => m.ParametrosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

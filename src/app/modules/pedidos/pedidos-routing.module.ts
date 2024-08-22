import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarMenuComponent } from './pages/registrar-menu/registrar-menu.component';
import { PedidoComponent } from './pages/sitios-disponibles/pedido.component';
import { HistorialPedidosComponent } from './pages/historial-de-pedidos/historial-pedidos.component';
import { Menu1Component } from './pages/sitios-disponibles/menu1/menu1.component';

const routes: Routes = [

  {
    path: 'registrarMenu',
    component: RegistrarMenuComponent
  },
  {
    path: 'pedido',
    component: PedidoComponent,
    children:[
      
      {path: 'menu1',
      component:  Menu1Component}
    ]
  },
  {
    path: 'historialDePedidos',
    component: HistorialPedidosComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }

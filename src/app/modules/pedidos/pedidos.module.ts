import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { RegistrarMenuComponent } from './pages/registrar-menu/registrar-menu.component';
import { PedidoComponent } from './pages/sitios-disponibles/pedido.component';
import { Menu1Component } from './pages/sitios-disponibles/menu1/menu1.component';
import { HistorialPedidosComponent } from './pages/historial-de-pedidos/historial-pedidos.component';
import { SharedModule } from '../shared/shared.module';
import { ModificarMenuComponent } from './shared/modificar-menu/modificar-menu.component';
import { AgregarMenuComponent } from './shared/agregar-menu/agregar-menu.component';


@NgModule({
  declarations: [RegistrarMenuComponent,PedidoComponent,Menu1Component,HistorialPedidosComponent,ModificarMenuComponent,AgregarMenuComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule
  ]
})
export class PedidosModule { }

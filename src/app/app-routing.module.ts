import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { DesbloquearUsuarioComponent } from './layouts/desbloquearUsuario/desbloquearUsuario.component';
import { ProveedorComponent } from './layouts/proveedor/proveedor.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { Restaurante_formComponent } from './modules/restaurante_form/restaurante_form.component';
import { RecuperarClaveComponent } from './components/recuperarClave/recuperarClave.component';
import { RestablecerClaveComponent } from './components/restablecerClave/restablecerClave.component';
import { Usuario_layoutComponent } from './layouts/dashboard/usuario_layout/usuario_layout.component';
import { RegistroMenuComponent } from './layouts/dashboard/registro-menu/registro-menu.component';
import { ConsultarPedidosComponent } from './components/pedidos/consultar-pedidos/consultar-pedidos.component';
import { VerRolesComponent } from './components/Rol/ver-roles/ver-roles.component';
import { AsignarRolesComponent } from './components/Rol/asignar-roles/asignar-roles.component';
import { Menu1Component } from './components/menus/menu1/menu1.component';

const routes: Routes = [
  {path:'',                                  redirectTo:'login', pathMatch:'full'},
  {path:'login',                             component : LoginComponent},
  {path:'recuperar_clave',                   component : RecuperarClaveComponent},
  {path:'restablecer_clave',                 component : RestablecerClaveComponent},

  {path:'home/seguridad',                    component : HomeComponent,
    children : [
      {path:'usuarios',                      component : Usuario_layoutComponent},
      {path:'desbloquear_usuario',           component : DesbloquearUsuarioComponent},
      {path:'registrarRoles',                component : VerRolesComponent},
      {path:'asignarPerfil',                 component : AsignarRolesComponent},
    ]
  },
  {path:'home/pedidos',                      component : ProveedorComponent,
    children : [
      {path:'registrar_menu',                component : RegistroMenuComponent,},
      {path:'pedido',                        component : PedidoComponent},
      {path:'menu1',                       component: Menu1Component},
      {path:'consultarPedidos',              component : ConsultarPedidosComponent}
      //{path:'historial_pedido'}
    ]
  },
  {path:'restaurantes/formulario_registro',  component : Restaurante_formComponent}
  /*,
  {path:'home/reportes'},
  {path:'home/parametros'},
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

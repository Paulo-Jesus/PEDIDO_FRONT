import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { DesbloquearUsuarioComponent } from './components/Seguridad/Desbloquear-Usuario/desbloquearUsuario.component';
import { ProveedorComponent } from './layouts/proveedor/proveedor.component';
import { PedidoComponent } from './components/Pedidos/Sitios-Disponibles/pedido.component';
import { Restaurante_formComponent } from './modules/restaurante_form/restaurante_form.component';
import { RecuperarClaveComponent } from './components/Utilities/recuperarClave/recuperarClave.component';
import { RestablecerClaveComponent } from './components/Utilities/restablecerClave/restablecerClave.component';
import { Usuario_layoutComponent } from './components/Seguridad/Usuarios/usuario_layout.component';
import { RegistroMenuComponent } from './components/Modales/registro-menu/registro-menu.component';
import { ConsultarPedidosComponent } from './components/Pedidos/Historial-de-Pedidos/consultar-pedidos.component';
import { VerRolesComponent } from './components/Seguridad/Crear-Perfil/ver-roles.component';
import { AsignarRolesComponent } from './components/Seguridad/Asignar-Perfil/asignar-roles.component';
import { Menu1Component } from './components/Pedidos/Menus-de-Sitios/menu1/menu1.component';

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

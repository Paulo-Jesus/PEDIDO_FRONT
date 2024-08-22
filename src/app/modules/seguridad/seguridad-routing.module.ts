import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuarios/usuario.component';
import { CrearPerfilComponent } from './pages/crear-perfil/crear-perfil.component';
import { AsignarPerfilComponent } from './pages/asignar-perfil/asignar-perfil.component';
import { DesbloquearUsuarioComponent } from './pages/desbloquear-usuario/desbloquear-usuario.component';

const routes: Routes = [

  {
    path: 'usuarios',
    component: UsuarioComponent
  },
  {
    path: 'crearPerfil',
    component: CrearPerfilComponent
  },
  {
    path: 'asignarPerfil',
    component: AsignarPerfilComponent
  },
  {
    path: 'desbloquearUsuario',
    component: DesbloquearUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { 
  
}

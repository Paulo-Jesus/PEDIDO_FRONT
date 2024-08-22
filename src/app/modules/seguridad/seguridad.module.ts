import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';

import { UsuarioComponent } from './pages/usuarios/usuario.component';
import { CrearPerfilComponent } from './pages/crear-perfil/crear-perfil.component';
import { AsignarPerfilComponent } from './pages/asignar-perfil/asignar-perfil.component';
import { DesbloquearUsuarioComponent } from './pages/desbloquear-usuario/desbloquear-usuario.component';
import { EditUserComponent } from './shared/modal-usuario/edit-user/edit-user.component';
import { AddUserComponent } from './shared/modal-usuario/add-user/add-user.component';
import { AddRolDialogComponent } from './shared/add-rol-dialog/add-rol-dialog.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsuarioComponent,CrearPerfilComponent,AsignarPerfilComponent,DesbloquearUsuarioComponent, EditUserComponent, AddUserComponent,AddRolDialogComponent ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    SharedModule
  ]
})
export class SeguridadModule { }

import { NgModule, ChangeDetectionStrategy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*COMPONENTS*/
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { DesbloquearUsuarioComponent } from './components/Seguridad/Desbloquear-Usuario/desbloquearUsuario.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SuccessComponent } from './services/Dialogs/success/success.component';
import { ProveedorComponent } from './layouts/proveedor/proveedor.component';
import { PedidoComponent } from './components/Pedidos/Sitios-Disponibles/pedido.component';
import { RegistroMenuComponent } from './components/Modales/registro-menu/registro-menu.component';
import { AgregarMenuComponent } from './components/Modales/agregar-menu/agregar-menu.component';
import { AsignarRolesComponent } from './components/Seguridad/Asignar-Perfil/asignar-roles.component';
import { Menu1Component } from './components/Pedidos/Menus-de-Sitios/menu1/menu1.component';
import { VerRolesComponent } from './components/Seguridad/Crear-Perfil/ver-roles.component';
import { RecuperarClaveComponent } from './components/Utilities/recuperarClave/recuperarClave.component';
import { RestablecerClaveComponent } from './components/Utilities/restablecerClave/restablecerClave.component';
import { Usuario_layoutComponent } from './components/Seguridad/Usuarios/usuario_layout.component';
import { AddUserComponent } from './components/Modales/Modal-Usuario/add-user/add-user.component';
import { AddRolDialogComponent } from './components/Modales/Modal-Crear-Perfil/add-rol-dialog/add-rol-dialog.component';
import { ModificarMenuComponent } from './components/Modales/modificar-menu/modificar-menu.component';
import { EditUserComponent } from './components/Modales/Modal-Usuario/edit-user/edit-user.component';

/*MATERIALS*/
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogModule} from '@angular/cdk/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {LoaderComponent } from './components/Utilities/loader/loader.component';
import { Restaurante_formComponent } from './modules/restaurante_form/restaurante_form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import {NgFor} from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EstadoPipe } from './Model/EstadoPipe';
import { ConsultarPedidosComponent } from './components/Pedidos/Historial-de-Pedidos/consultar-pedidos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    DesbloquearUsuarioComponent,
    SuccessComponent,
    LoaderComponent,
    Restaurante_formComponent,
    ProveedorComponent,
    PedidoComponent,
    RecuperarClaveComponent,
    RestablecerClaveComponent,
    Usuario_layoutComponent,
    AddUserComponent,
    RegistroMenuComponent,
    AgregarMenuComponent,
    ModificarMenuComponent,
    AddRolDialogComponent,
    VerRolesComponent,
    EstadoPipe,
    ConsultarPedidosComponent,
    EditUserComponent,
    AsignarRolesComponent,
    Menu1Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    DialogModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    NgFor,
    OAuthModule.forRoot(),
    HttpClientModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  exports:[EstadoPipe],
  providers: [  
    MatDatepickerModule,
    MatNativeDateModule  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, ChangeDetectionStrategy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*COMPONENTS*/
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DesbloquearUsuarioComponent } from './layouts/desbloquearUsuario/desbloquearUsuario.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SuccessComponent } from './services/Dialogs/success/success.component';
import { ProveedorComponent } from './layouts/proveedor/proveedor.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { RegistroMenuComponent } from './layouts/dashboard/registro-menu/registro-menu.component';
import { AgregarMenuComponent } from './layouts/dashboard/registro-menu/agregar-menu/agregar-menu.component';
import { AsignarRolesComponent } from './components/Rol/asignar-roles/asignar-roles.component';
import { Menu1Component } from './components/menu1/menu1.component';
import { EditUserComponent } from './layouts/dashboard/usuario_layout/add-edit-search-usuario/edit-user/edit-user.component';

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
import { LoaderComponent } from './components/Utilities/loader/loader.component';
import { Restaurante_formComponent } from './modules/restaurante_form/restaurante_form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RecuperarClaveComponent } from './components/recuperarClave/recuperarClave.component';
import { RestablecerClaveComponent } from './components/restablecerClave/restablecerClave.component';
import { Usuario_layoutComponent } from './layouts/dashboard/usuario_layout/usuario_layout.component';
import { AddUserComponent } from './layouts/dashboard/usuario_layout/add-edit-search-usuario/add-user/add-user.component';
import { MatCardModule } from '@angular/material/card'; 
import { NgFor } from '@angular/common';
import { ModificarMenuComponent } from './layouts/dashboard/registro-menu/modificar-menu/modificar-menu.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AddRolDialogComponent } from './components/Rol/add-rol-dialog/add-rol-dialog.component';
import { VerRolesComponent } from './components/Rol/ver-roles/ver-roles.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EstadoPipe } from './Model/EstadoPipe';
import { ConsultarPedidosComponent } from './components/pedidos/consultar-pedidos/consultar-pedidos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FechaPipe } from './Model/fechaPipe';



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
    FechaPipe,
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

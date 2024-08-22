import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarClaveComponent } from './pages/recuperarClave/recuperarClave.component';
import { RestablecerClaveComponent } from './pages/restablecerClave/restablecerClave.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';



@NgModule({
  declarations: [LoginComponent,RecuperarClaveComponent,RestablecerClaveComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }

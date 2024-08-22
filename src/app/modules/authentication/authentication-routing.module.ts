import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarClaveComponent } from './pages/recuperarClave/recuperarClave.component';
import { RestablecerClaveComponent } from './pages/restablecerClave/restablecerClave.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent
  },
    
  {
    path: 'recuperarClave',
    component: RecuperarClaveComponent
  },
    
  {
    path: 'restablecerClave',
    component: RestablecerClaveComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from './login.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  isLoggedIn: boolean = false;
  profileemail = "";
  entrar=false;
  
  constructor(

    private oauthService: OAuthService,
    private router: Router,
    private _loginService: LoginService,
    private snackBar: MatSnackBar,
  ) { 
    this.initLogin();
  }

  initLogin() {
    if(this.entrar == false){
      const config: AuthConfig = {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        clientId: '858175513460-1lqpsrp1dq2rk2s75jbrc77et6gc92k6.apps.googleusercontent.com',
        redirectUri: window.location.origin + '/login',
        scope: 'openid profile email',
      }
  
      this.oauthService.configure(config);
      this.oauthService.setupAutomaticSilentRefresh();
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        this.checkAccessTokenValidity();
      });
    } 
  }

  checkAccessTokenValidity() {
    if (this.oauthService.hasValidAccessToken()) {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      const profile = this.getProfile();
      if (profile){
        this.profileemail = profile['email'] || '';
        console.log(this.profileemail);
        sessionStorage.setItem('profileemail', this.profileemail);
      }
      console.log("Guardado");
      this.Autoinicio();
    } else {
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      console.log("Eliminado");
    }
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    console.log('Cerrando sesión...');
    this.oauthService.logOut(); 
    localStorage.removeItem("isLoggedIn");
    this.entrar = false;
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  Autoinicio() {
    const profileemail = sessionStorage.getItem("profileemail");
    if (profileemail !== null ) {
      console.log("entro");
      const loginDTO = { Correo: profileemail, Contrasena: " "};
      console.log(loginDTO);
      
      this._loginService.loginGoogle(loginDTO).subscribe(response =>{
        console.log("Datos correctos");
        this.router.navigate(['/home/seguridad/usuarios']);
      }, error =>{
        console.log("Datos incorrectos",error);
        this.mostrarMensajeError();
        sessionStorage.clear();
      });
    }
  }

  mostrarMensajeError() {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open('Gmail no Registrado', 'Cerrar', config);
  }
  
}

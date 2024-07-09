import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthGoogleService {
isLoggedIn: boolean = false;
profileemail = "";
  constructor(
    private oauthService: OAuthService,
    private router:Router,
  ) { 
    this.initLogin();
  }

  initLogin() {
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
  checkAccessTokenValidity() {
    if (this.oauthService.hasValidAccessToken()) {
      this.isLoggedIn = true;
      // Guardar información de sesión en localStorage
      localStorage.setItem('isLoggedIn', 'true');
      const profile = this.getProfile();
      if (profile){
        this.profileemail = profile['email'] || '';
        console.log(this.profileemail);
        localStorage.setItem('profileemail', this.profileemail);
      }
      console.log("Guardado");
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
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

}

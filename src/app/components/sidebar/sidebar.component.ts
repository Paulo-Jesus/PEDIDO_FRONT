import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenDecoderService } from 'src/app/services/Token/token-decoder.service';
import { AuthenticationService } from 'src/app/services/Token/authentication.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role: string = '';
  validacionrol!: boolean;
  validacionprove!: boolean;


  constructor(
    private router:Router, 
    private _loginService:LoginService,
    private dialog:Dialog,
    private authGoogleService: AuthGoogleService,
    private tokendecoder :TokenDecoderService,
    private cookieService: CookieService,
    private tokenValidator: AuthenticationService, 
    

  ) { }

  ngOnInit() {
   this.role = this.tokendecoder.obtainRol();
   console.log(this.role)
   
   this.validacionrol= this.role === '1';
   this.validacionprove= this.role === '3' ;

  }
  
  compararTokens() {
    const tokenFrontend = this.cookieService.get('token');

    this.tokenValidator.compararTokens(tokenFrontend).subscribe(
      (resultado: boolean) => { 
        if (resultado) {
          console.log('Los tokens son iguales');
        } else {
          console.log('Los tokens no son iguales');
        }
      });
  }

  logout(){
    this.authGoogleService.logout();
    this._loginService.logout();
    sessionStorage.clear();
    this.ocultarSideBar();
  }

  ocultarSideBar(){
    this.dialog.closeAll();
  }

  navigateToUsers(){
    this.router.navigate(["home/seguridad/usuarios"]);
    this.ocultarSideBar();
  }

  navigateToUnblockUser(){
    this.router.navigate(["home/seguridad/desbloquear_usuario"]);
    this.ocultarSideBar();
  }

  navigateToRegistroMenu(){
    this.router.navigate(["home/pedidos/registrar_menu"]);
    this.ocultarSideBar();
  }
  navigateToPedido(){
    this.router.navigate(["home/pedidos/pedido"]);
    this.ocultarSideBar();
  }
  
  navigateHistorialPedido() {
    this.router.navigate(["home/pedidos/consultarPedidos"]);
    this.ocultarSideBar();
  }

  navigateToRegistrarRol() {
    this.router.navigate(["home/seguridad/registrarRoles"]);
    this.ocultarSideBar();
  }

  navigateToAsignarPerfil() {
    this.router.navigate(["home/seguridad/asignarPerfil"]);
    this.ocultarSideBar();
  }

  isActive = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

}

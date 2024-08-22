import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services/token/authentication.service';
import { CookieService } from 'Cookie/ngx-cookie-service';
import { LoginService } from 'src/app/modules/authentication/services/login.service';
import { AuthGoogleService } from 'src/app/modules/authentication/services/auth-google.service';
import { TokenDecoderService } from '../../services/token/token-decoder.service';


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
    private _dialog:Dialog,
    private _authGoogleService: AuthGoogleService,
    private _tokendecoder :TokenDecoderService,
    private _cookieService: CookieService,
    private _tokenValidator: AuthenticationService, 
    

  ) { }

  ngOnInit() {
   this.role = this._tokendecoder.obtainRol();
   console.log(this.role)
   
   this.validacionrol= this.role === '1';
   this.validacionprove= this.role === '3' ;

  }
  
  compararTokens() {
    const tokenFrontend = this._cookieService.get('token');

    this._tokenValidator.compararTokens(tokenFrontend).subscribe(
      (resultado: boolean) => { 
        if (resultado) {
          console.log('Los tokens son iguales');
        } else {
          console.log('Los tokens no son iguales');
        }
      });
  }

  logout(){
    this._authGoogleService.logout();
    this._loginService.logout();
    sessionStorage.clear();
    this.ocultarSideBar();
  }

  ocultarSideBar(){
    this._dialog.closeAll();
  }

  navigateToUsers(){
    this.router.navigateByUrl("home/seguridad/usuarios");
    this.ocultarSideBar();
  }

  navigateToRegistrarRol() {
    this.router.navigateByUrl("home/seguridad/crearPerfil");
    this.ocultarSideBar();
  }

  navigateToAsignarPerfil() {
    this.router.navigateByUrl("home/seguridad/asignarPerfil");
    this.ocultarSideBar();
  }

  navigateToUnblockUser(){
    this.router.navigateByUrl("home/seguridad/desbloquearUsuario");
    this.ocultarSideBar();
  }


  
  navigateToRegistroMenu(){
    this.router.navigateByUrl("home/pedidos/registrarMenu");
    this.ocultarSideBar();
  }
  navigateToPedido(){
    this.router.navigateByUrl("home/pedidos/pedido");
    this.ocultarSideBar();
  }
  
  navigateHistorialPedido() {
    this.router.navigateByUrl("home/pedidos/historialDePedidos");
    this.ocultarSideBar();
  }

 

navigateToReporte() {
    this.router.navigateByUrl("home/reporte");
    this.ocultarSideBar();
  }

  isActive = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

}

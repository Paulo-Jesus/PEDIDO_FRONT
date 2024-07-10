import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router:Router, 
    private _loginService:LoginService,
    private dialog:Dialog,
    private authGoogleService: AuthGoogleService
  ) { }

  ngOnInit() {
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
  

  isActive = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

}

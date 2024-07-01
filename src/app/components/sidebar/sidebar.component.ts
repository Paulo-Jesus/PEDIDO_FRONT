import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private dialog:Dialog
  ) { }

  ngOnInit() {
  }
  
  logout(){
    this._loginService.logout();
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
  navigateToPedido(){
    this.router.navigate(["home/pedidos/pedido"]);
    this.ocultarSideBar();
  }
  

  isActive = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

}

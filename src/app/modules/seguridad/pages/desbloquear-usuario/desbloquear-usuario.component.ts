import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';

import { TableColumn } from 'src/app/Interfaces/TableColumn';

import { SuccessComponent } from 'src/app/modules/shared/services/dialog/success/success.component';
import { RolesService } from 'src/app/services/PerfilRol/roles.service';
import { UsuarioService } from 'src/app/modules/seguridad/services/usuario.service';
import { UsuarioBlock } from 'src/app/Interfaces/UsuarioBlock';
import { Role } from 'src/app/Interfaces/role';
import { envMensajes } from 'src/environments/env-mensajes';
import { envRutas } from 'src/environments/env-rutas';



@Component({
  selector: 'app-desbloquear-usuario',
  templateUrl: './desbloquear-usuario.component.html',
  styleUrls: ['./desbloquear-usuario.component.css']
})
export class DesbloquearUsuarioComponent implements OnInit {


  tableData: Array<UsuarioBlock> = [];
  tableColumns: Array<TableColumn> =[
    { title:'Nombre', nameProperty:'nombre',fct: (element: UsuarioBlock) =>`${element.nombre}` },
    { title:'Correo', nameProperty:'correo',fct: (element: UsuarioBlock) =>`${element.correo}` },
    { title:'Perfil', nameProperty:'nombreRol',fct: (element: UsuarioBlock) =>`${element.nombreRol}` },
    { title:'Estado', nameProperty:'nombreEstado',fct:(element: UsuarioBlock) =>`${element.nombreEstado}`  },

  ];

  selectedOption : string ="";
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  nombreUsuarioObtenido : string = "";
  nombreEstadoObtenido! : boolean;
  pInicial! : string;
  correoIngresado! : string;
  nombreUsuariosFiltrados : any = {};


  datosTabla : UsuarioBlock[] = [];
  rolesDatos: Role[]=[];
  checked! : boolean;
  
  userRowData : any = {};

  dataSource: any = new MatTableDataSource();
 

  length! : number;
 

  //loader
  load:boolean=false;

  constructor(
    private _roleService: RolesService,
    private _usuarioService:UsuarioService, 
    private _router:Router,
    private _snackBar: MatSnackBar,
    public dialog:Dialog,
    private fb:FormBuilder
  )
  {
  }

  ngOnInit(): void {
      this.getBlockedUsers();
      this.getRoles();
      this.length = this.datosTabla.length;
  }

  getBlockedUsers(){
    this._usuarioService.obtenerTodosBloqueados().subscribe((response: any)=>{
      this.tableData = response.data;
      console.log(this.tableData);
    },error=>{
      console.log(envMensajes.errorObtenerDatos);
    })
  }
  getRoles(){
    this._roleService.getRoles().subscribe({next:(response)=> {
      if (response.code) {
        this.rolesDatos = response.data;
        console.log(this.rolesDatos)
      } else {
        console.log('No se encontraron datos', 'Oops');
      }
    },
  })
  }

  buscarUsuario(correo:string, correoInput: HTMLInputElement){
    this.correoIngresado = correo;

    if (this.selectedOption.length > 0) {
      this.dataSource.filter = `${correo} ${this.selectedOption}`;
    } else {
      this.dataSource.filter = correo;
    }
    correoInput.value = envMensajes.stringVacio;
  }

  setSelection(evento: any)
  {
    this.selectedOption = evento;
  }

  limpiarDatos():void{
    this.selectedOption = this.pInicial;
    this.getBlockedUsers();
  }

  desbloquearUsuario():void{
    if(this.nombreEstadoObtenido){
      console.log(this.nombreUsuarioObtenido)
      if(this.nombreUsuarioObtenido){
        this.load = false;
        this._usuarioService.desbloquearCuenta(this.nombreUsuarioObtenido).subscribe(response=>{
          this.dialog.open(SuccessComponent,
            {
              width:'400px',
              height:'250px'
            }
          );
          this.load = true;

          this._snackBar.open(envMensajes.usuarioDesbloqueado, envMensajes.exito, {            
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
      }
      }else{
        this._snackBar.open(envMensajes.usuarioNoSeleccionado, envMensajes.error, {         
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
      });
    }
  }

  rowSelect(element:any):string{
    this.userRowData = element;
    this.nombreEstadoObtenido = this.userRowData.checked;
    return this.nombreUsuarioObtenido = this.userRowData.correo;
  }

  refresh(): void {
		this._router.navigate([envRutas.r_DesbloquearUsuario]);
	}

}

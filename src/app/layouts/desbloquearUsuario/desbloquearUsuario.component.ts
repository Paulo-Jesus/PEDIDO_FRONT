import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { UsuarioBlock } from 'src/app/interfaces/UsuarioBlock';
import { SuccessComponent } from 'src/app/services/Dialogs/success/success.component';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-desbloquearUsuario',
  templateUrl: './desbloquearUsuario.component.html',
  styleUrls: ['./desbloquearUsuario.component.css']
})
export class DesbloquearUsuarioComponent implements OnInit {

  selectedOption : string ="";
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  nombreEstado:string = "";
  nombreUsuarioObtenido : string = "";
  nombreEstadoObtenido! : boolean;
  searchText: any;

  nombreUsuariosFiltrados : any = {};
  usuariosBloqueados : UsuarioBlock[] = [];

  userRowData : any = {};
  checked! : boolean;
  displayedColumns: string[] = ['check', 'name', 'userName', 'rol', 'state'];

  dataSource: any = new MatTableDataSource();
  datosTabla: any[] = [];

  length! : number;
  load:boolean=false;

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private _usuarioService:UsuarioService, 
    private _router:Router,
    private _snackBar: MatSnackBar,
    public dialog:Dialog
  )
  {
  }

  ngOnInit(): void {
      this.obtenerDatos();
      this.length = this.datosTabla.length;
  }

  obtenerDatos(){
    this._usuarioService.obtenerTodos().subscribe((response: any)=>{
      this.datosTabla = response.response.data;
      this.dataSource = new MatTableDataSource(response.response.data);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    },error=>{
      console.log('Error al obtener los datos')
    })
  }

  buscarUsuario(){
    if (this.selectedOption.length > 0)
      {
        this.dataSource.filter = this.selectedOption;
      }
  }

  setSelection(evento: any)
  {
    this.selectedOption = evento;
  }

  limpiarDatos():void{
    this.obtenerDatos();
  }

  desbloquearUsuario():void{
    if(this.nombreEstadoObtenido){
      if(this.nombreUsuarioObtenido){
        this.load = false;
        setTimeout(() => {
          this.load = true;
        }, 5000);
        this._usuarioService.desbloquearCuenta(this.nombreUsuarioObtenido).subscribe(response=>{
          this.dialog.open(SuccessComponent,
            {
              width:'400px',
              height:'250px'
            }
          );
          this.load = true;

          this._snackBar.open('Usuario Desbloqueado', 'Exito', {            
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
      }
      }else{
        this._snackBar.open('Debes seleccionar un usuario para eliminarlo', 'ERROR', {         
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
      });
    }
  }

  rowSelect(element:any):string{
    this.userRowData = element;
    this.nombreEstadoObtenido = this.userRowData.checked;
    return this.nombreUsuarioObtenido = this.userRowData.nombreUsuario;
  }

  refresh(): void {
		this._router.navigate(["home/seguridad/usuario/desbloquear_usuario"]);
	}

}


import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddUserComponent } from '../../Modales/Modal-Usuario/add-user/add-user.component';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../Modales/Modal-Usuario/edit-user/edit-user.component';

@Component({
  selector: 'app-usuario_layout',
  templateUrl: './usuario_layout.component.html',
  styleUrls: ['./usuario_layout.component.css']
})
export class Usuario_layoutComponent implements OnInit,AfterViewInit {

  form:FormGroup;
  selectedOption!:string;
  datosTabla: Usuario[]= [];
  dataSource = new MatTableDataSource<Usuario>(this.datosTabla);
  displayedColumns: string[] = ['action', 'identificacion', 'nombre', 'telefono' ,'correo','estado'];
  
  length! : number;
  load:boolean=false;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService
  ) { 
    this.form = this.createForm();
  }

  createForm(){
    return this.fb.group({
      idUsuario:      [0],
      cedula:         ['', [Validators.required, Validators.maxLength(10)]],
      nombre:         ['', [Validators.required, Validators.maxLength(50)]],
      correo:         ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      telefono:       ['', [Validators.required, Validators.maxLength(10)]],
      direccion:      ['', [Validators.required, Validators.maxLength(70)]],
      idRol:          ['', Validators.required],
      idEmpresa:      ['', Validators.required],
      idEstado:       [false, Validators.required],
      idCuenta:       [0]
    });
  }


  ngOnInit() {
    this.obtenerDatos();
    this.length = this.datosTabla.length;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginacionTabla;
  }

  obtenerDatos(){
    this._usuarioServicio.obtenerTodosUsuarios().subscribe({ next: (response) => {
      if (response.code) {
        this.dataSource.data = response.data;
        
        
        console.log(response)
      } else {
        console.log('No se encontraron datos', 'Oops');
        
      }
      },


    })
  }

  
  mostrarRol(id:number){
    switch(id){
      case id=1:
         return "Activo";
         break;
      case id=2:
        return "Inactivo";
        break;
      case id=3:
        return "Bloqueado";
        break;
        default:
        return "No hay rol";
        break;
        
      
 
    }

  }

  rowSelect(element:any){
    /*
    this.userRowData = element;
    this.nombreEstadoObtenido = this.userRowData.checked;
    return this.nombreUsuarioObtenido = this.userRowData.nombreUsuario;
    */
  }
  viewAddUser(){
    this.dialog.open(AddUserComponent,{
      width:'60%',
      height:'80%'
    })
  }
  viewEditUser(){
    this.dialog.open(EditUserComponent,{
      width:'60%',
      height:'80%'
    })
  }
}

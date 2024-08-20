
import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddUserComponent } from '../../Modales/Modal-Usuario/add-user/add-user.component';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../Modales/Modal-Usuario/edit-user/edit-user.component';
import { TableColumn } from 'src/app/Interfaces/TableColumn';
import { empty } from 'rxjs';

@Component({
  selector: 'app-usuario_layout',
  templateUrl: './usuario_layout.component.html',
  styleUrls: ['./usuario_layout.component.css']
})
export class Usuario_layoutComponent implements OnInit,AfterViewInit {

  
  tableData: Array<Usuario> = [];
  tableColumns: Array<TableColumn> =[
    { title:'Identificación', nameProperty:'cedula',fct: (element: Usuario) =>`${element.cedula}` },
    { title:'Nombre', nameProperty:'nombre',fct: (element: Usuario) =>`${element.nombre}` },
    { title:'Empresa', nameProperty:'idEmpresa',fct: (element: Usuario) =>this.mostrarEmpresa(element.idEmpresa) },
    { title:'Estado', nameProperty:'idEstado',fct:(element: Usuario) =>this.mostrarRol(element.idEstado) },

  ];

  form:FormGroup;
  selectedOption!:string;

  datosTabla: Usuario[]= [];
  dataSource = new MatTableDataSource<Usuario>();

  
  length! : number;
  load:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator

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
    this.dataSource.paginator=this.paginator;
  }

  obtenerDatos(){
    this._usuarioServicio.obtenerTodosUsuarios().subscribe({ next: (response) => {
      if (response.code) {
        this.tableData = response.data;
        console.log(this.tableData)
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
      case id=2:
        return "Inactivo";
      case id=3:
        return "Bloqueado";
        default:
        return "No hay rol";
    }
  }

   
  mostrarEmpresa(id:number){
    switch(id){
      case id=1:
         return "Viamatica";
      case id=2:
        return "Empresa 2";
      case id=3:
        return "A";
        default:
        return "No hay empresa asignada";
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

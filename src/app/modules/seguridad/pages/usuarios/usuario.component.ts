
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserComponent } from '../../shared/modal-usuario/add-user/add-user.component';
import { UsuarioService } from 'src/app/modules/seguridad/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../shared/modal-usuario/edit-user/edit-user.component';
import { TableColumn } from 'src/app/Interfaces/TableColumn';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { EmpresasService } from 'src/app/services/PerfilRol/empresas.service';
import { Usuario } from 'src/app/Interfaces/Usuario';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  
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
  datosEmpresa: Empresa[]=[];

  
  length! : number;
  load:boolean=false;



  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _empresaService:EmpresasService
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
    this.getEmpresas();
    this.length = this.datosTabla.length;
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

  getEmpresas(){
    this._empresaService.getEmpresas().subscribe({next:(response)=>{
      if(response.code){
        this.datosEmpresa=response.data;
        console.log(this.datosEmpresa)

      }else{
        console.log('No hay datos de empresas')
      }
    }})

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
         return "Comida";
      case id=2:
        return "Viamatica";
      case id=3:
        return "A";
        default:
        return "No hay empresa asignada";
    }
  }

  // rowSelect(element:any){
    
  //   this.userRowData = element;
  //   this.nombreEstadoObtenido = this.userRowData.checked;
  //   return this.nombreUsuarioObtenido = this.userRowData.nombreUsuario;
    
  // }

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

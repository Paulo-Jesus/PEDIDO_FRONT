
import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService
  ) { 
    this.form = this.fb.group({
      identificacion: [''],
      nombre: [''],
      opcion: ['']
    });
  }

  ngOnInit() {
    this.obtenerDatos();
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/Interfaces/role';
import { AddRolDialogComponent } from '../../Modales/Modal-Crear-Perfil/add-rol-dialog/add-rol-dialog.component';
import { EstadosService } from 'src/app/services/PerfilRol/estados.service';
import { RolesService } from 'src/app/services/PerfilRol/roles.service';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { Dialog } from '@angular/cdk/dialog';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent implements OnInit{

  listEstados: any[] = [];
  listPerfiles: string[] = [];
  allRoles: Role[] = [];
  dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  selectedPerfil: string = '';
  selectedEstado: string = '';

  pageSize: number = 0;

  form:FormGroup;
  selectedOption!:string;
  datosTabla: Usuario[]= [];
 
  displayedColumns: string[] = ['action', 'identificacion', 'nombre', 'telefono' ,'correo','estado'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialog: Dialog,
    private roleService: RolesService, 
    private estadoServices: EstadosService,
    

    private _usuarioServicio: UsuarioService
  ) { 
    this.form = this.fb.group({
      identificacion: [''],
      nombre: [''],
      opcion: ['']
    });
  }

  ngOnInit() {
    this.obtenerRoles();
    this.obtenerEstados();
  }
  

  toggleEstado(role: Role): void {
    role.estado = role.estado === 1? 2 : 1;
    this.actualizarEstado(role);
  }

  actualizarEstado(role: Role): void {
    const updatedRol = { ...role, estado: role.estado };

    this.roleService.updateRol(updatedRol).subscribe((data: any) => {
      console.log('Estado actualizado:', data);
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const selectedEstadoNumber = this.selectedEstado === 'Activo' ? 1 : this.selectedEstado === 'Inactivo' ? 2 : '';
  
    const filteredRoles = this.allRoles.filter((role) => {
      return (
        (!this.selectedPerfil || role.nombre === this.selectedPerfil) &&
        (!this.selectedEstado || role.estado === selectedEstadoNumber)
      );
    });
  
    this.dataSource.data = filteredRoles;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.selectedPerfil = '';
    this.selectedEstado = '';
  }
  
  


  obtenerRoles() {
    this.roleService.getRoles().subscribe((data: { data: any[]; }) => {
      this.allRoles = data.data.map((role: any) => ({
        ...role
      }));
      this.dataSource = new MatTableDataSource(this.allRoles);
      this.dataSource.paginator = this.paginator;
      //console.log(this.allRoles)
      this.listPerfiles = this.allRoles.map((role) => role.nombre);
    });
  }

  obtenerEstados() {
    this.estadoServices.getEstado().subscribe((data) => {
      this.listEstados = data.data;
    });
  }

  

  rowSelect(element:any){
    /*
    this.userRowData = element;
    this.nombreEstadoObtenido = this.userRowData.checked;
    return this.nombreUsuarioObtenido = this.userRowData.nombreUsuario;
    */
  }
  

  // displayedColumns: string[] = ['perfil', 'estado'];
  // listEstados: any[] = [];
  // listPerfiles: string[] = [];
  // allRoles: Role[] = [];
  // dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  // selectedPerfil: string = '';
  // selectedEstado: string = '';

  // pageSize: number = 0;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // constructor(
  //         private roleService: RolesService, 
  //         private estadoServices: EstadosService,
  //         public dialog: MatDialog, 
  //         private _snackBar: MatSnackBar) {}

  // ngOnInit(): void {
  //   this.obtenerRoles();
  //   this.obtenerEstados();
  // }

  // toggleEstado(role: Role): void {
  //   role.estado = role.estado === 1? 2 : 1;
  //   this.actualizarEstado(role);
  // }

  // actualizarEstado(role: Role): void {
  //   const updatedRol = { ...role, estado: role.estado };

  //   this.roleService.updateRol(updatedRol).subscribe((data: any) => {
  //     console.log('Estado actualizado:', data);
  //     this.applyFilter();
  //   });
  // }

  // applyFilter(): void {
  //   const selectedEstadoNumber = this.selectedEstado === 'Activo' ? 1 : this.selectedEstado === 'Inactivo' ? 2 : '';
  
  //   const filteredRoles = this.allRoles.filter((role) => {
  //     return (
  //       (!this.selectedPerfil || role.nombre === this.selectedPerfil) &&
  //       (!this.selectedEstado || role.estado === selectedEstadoNumber)
  //     );
  //   });
  
  //   this.dataSource.data = filteredRoles;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  //   this.selectedPerfil = '';
  //   this.selectedEstado = '';
  // }
  
  


  // obtenerRoles() {
  //   this.roleService.getRoles().subscribe((data: { data: any[]; }) => {
  //     this.allRoles = data.data.map((role: any) => ({
  //       ...role
  //     }));
  //     this.dataSource = new MatTableDataSource(this.allRoles);
  //     this.dataSource.paginator = this.paginator;
  //     //console.log(this.allRoles)
  //     this.listPerfiles = this.allRoles.map((role) => role.nombre);
  //   });
  // }

  // obtenerEstados() {
  //   this.estadoServices.getEstado().subscribe((data) => {
  //     this.listEstados = data.data;
  //   });
  // }

  // openAddRoleDialog(role?: Role): void {
  //   const dialogRef = this.dialog.open(AddRolDialogComponent, {
  //     height: '500px',
  //     width: '400px',
  //     data: role ? { role } : null
  //   });
    

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (result.action === 'add') {
  //         this.addRol();
  //         this.openSnackBar(result.role);
  //       } 
  //     }
  //   });
  // }

  // addRol(): void {
  //   this.obtenerRoles(); 
  // }

  // openSnackBar(message:string) {
  //   this._snackBar.open(message, 'Aceptar', {
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom',
  //   });
  // }

}
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/Interfaces/role';
import { AddRolDialogComponent } from '../../shared/add-rol-dialog/add-rol-dialog.component';
import { EstadosService } from 'src/app/services/PerfilRol/estados.service';
import { RolesService } from 'src/app/services/PerfilRol/roles.service';
import { UsuarioService } from 'src/app/modules/seguridad/services/usuario.service';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { Iestado } from 'src/app/Interfaces/iestado';
import { FormGroup, FormBuilder} from '@angular/forms';
import { TableColumn } from 'src/app/Interfaces/TableColumn';
@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit{

  tableData: Array<Role> = [];
  tableColumns: Array<TableColumn> =[
    { title:'Perfil', nameProperty:'nombre',fct: (element: Usuario) =>`${element.nombre}` },
    { title:'Estado', nameProperty:'idEstado',fct:(element: Usuario) =>this.mostrarRol(element.idEstado) },

  ];

  //estado deberia ser un toggle
  datosTabla: Role[] = [];
  dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();

  
  listEstados: any[] = [];
  listPerfiles: string[] = [];
  
  selectedPerfil: string = '';
  selectedEstado: string = '';

  pageSize: number = 0;
  length! : number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
          private _roleService: RolesService, 
          private estadoServices: EstadosService,
          public dialog: MatDialog, 
          private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerEstados();
    this.getRoles();
    this.length = this.datosTabla.length;
  }

  toggleEstado(role: Role): void {
    role.idEstado = role.idEstado === 1? 2 : 1;
    this.actualizarEstado(role);
  }

  actualizarEstado(role: Role): void {
    const updatedRol = { ...role, estado: role.idEstado };

    this._roleService.updateRol(updatedRol).subscribe((data: any) => {
      console.log('Estado actualizado:', data);
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const selectedEstadoNumber = this.selectedEstado === 'Activo' ? 1 : this.selectedEstado === 'Inactivo' ? 2 : '';
  
    const filteredRoles = this.datosTabla.filter((role) => {
      return (
        (!this.selectedPerfil || role.nombre === this.selectedPerfil) &&
        (!this.selectedEstado || role.idEstado === selectedEstadoNumber)
      );
    });
  
    this.dataSource.data = filteredRoles;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.selectedPerfil = '';
    this.selectedEstado = '';
  }
  

  getRoles(){
    this._roleService.getRoles().subscribe({next:(response)=> {
      if (response.code) {
        this.tableData = response.data;
        console.log(this.tableData)
      } else {
        console.log('No se encontraron datos', 'Oops');
      }
    },
  })
  }
  

//borrar
  obtenerRoles() {
    this._roleService.getRoles().subscribe((data: { data: any[]; }) => {
      this.datosTabla = data.data.map((role: any) => ({
        ...role
      }));
      this.dataSource = new MatTableDataSource(this.datosTabla);
      this.dataSource.paginator = this.paginator;
  
      this.listPerfiles = this.datosTabla.map((role) => role.nombre);
    });
  }

  obtenerEstados() {
    this.estadoServices.getEstado().subscribe((data) => {
      this.listEstados = data.data;
    });
  }

  openAddRoleDialog(role?: Role): void {
    const dialogRef = this.dialog.open(AddRolDialogComponent, {
      height: '500px',
      width: '400px',
      data: role ? { role } : null
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'add') {
          this.addRol();
          this.openSnackBar(result.role);
        } 
      }
    });
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
  addRol(): void {
    this.obtenerRoles(); 
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Aceptar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  
}
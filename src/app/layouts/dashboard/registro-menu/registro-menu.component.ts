import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarMenuComponent } from './agregar-menu/agregar-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { ModificarMenuComponent } from './modificar-menu/modificar-menu.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Menu } from 'src/app/interfaces/Menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MenuService } from 'src/app/services/menu.service';
import { map, Observable } from 'rxjs';

interface Hora {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro-menu',
  templateUrl: './registro-menu.component.html',
  styleUrls: ['./registro-menu.component.css']
})
export class RegistroMenuComponent implements OnInit  {
  form:FormGroup;
  selectedHoraI: string | undefined;
  selectedHoraF: string | undefined;
  selectedOption!:string;
  todayDate: string;
  datosTabla:any;
  existeMenuDia!: number;
  menu?: Menu;
  dataSource = new MatTableDataSource<Producto>([]);
  selection = new SelectionModel<Producto>(true, []);
  displayedColumns: string[] = ['seleccion', 'nombre', 'categoria', 'precio' , 'opcion'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  horas: Hora[] = [];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productoService: ProductoService,
    private menuService: MenuService
  ) { 
    this.todayDate = new Date().toLocaleDateString();
    this.form = this.fb.group({
      horaI:[''],
      horaF:[''],
    });
    //visualizacion de las horas desde las 00:00 hasta las 23:55
    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 5) {
        const horaStr = ('0' + hora).slice(-2);
        const minutoStr = ('0' + minuto).slice(-2);
        const horaCompleta = `${horaStr}:${minutoStr}`;
        this.horas.push({ value: horaCompleta, viewValue: horaCompleta });
      }
    }
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.cargarProductos(1);

    this.consultaTieneMenu(1).subscribe((data: number) => {

      if(data > 0) {
        this.obtenerMenuDia(1).subscribe((data:Menu) => {
          this.menu = data
        });

      } else {
        //console.log("No hay")
      }
    });
  }

  openDialogAgregar() {
    this.dialog.open(AgregarMenuComponent, {
      width: '50%',
      height:'80%',
      data: this.dataSource
    });
  }


  // openDialogModificar(nombre: string, categoria:string, precio:string){
  //   let objModificar = {nombre, categoria, precio}
  //   this.dialog.open(ModificarMenuComponent, {
  //     width: '50%',
  //     height:'70%',
  //     data: objModificar
  //   });
  // }

  openDialogModificar(producto:Producto){
    this.dialog.open(ModificarMenuComponent, {
      width: '40%',
      height:'80%',
      data: producto
    });
  }

  Eliminar(IdProducto: number){
    this.productoService.eliminarProducto(IdProducto, 2).subscribe((resp: any) => {
      const config = new MatSnackBarConfig();
      config.duration = 4000;
      this.snackBar.open('Plato eliminado con exito.', 'Cerrar', config);

      this.cargarProductos(1);
    }, error => {
      const config = new MatSnackBarConfig();
      config.duration = 4000;
      this.snackBar.open(`Error al eliminar el plato ${error}`, 'Cerrar', config);
    });
  }

  Guardar(){
    //codigo para que se envien el menu del dia
    this.mostrarMensajeExito();
  }

  mostrarMensajeExito() {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open('Datos guardados con éxito', 'Cerrar', config);
  }

  cargarProductos(IdProveedor: number): void {
    this.productoService.obtenerProductos(IdProveedor).subscribe((data: Producto[]) => {
      this.dataSource.data = data;
    });
  }

  consultaTieneMenu(IdProveedor: number): Observable<number> {
    return this.menuService.consultaTieneMenu(IdProveedor);
  }

  obtenerMenuDia(IdProveedor: number): Observable<Menu> {
    return this.menuService.obtenerProductosMenu(IdProveedor).pipe(
      map((data: Menu) => {
        return {
          IdMenu: data.IdMenu,
          IdProveedor: data.IdProveedor,
          FechaInicio: data.FechaInicio,
          FechaFin: data.FechaFin,
          Platillos: data.Platillos
        };
      })
    );
  }

  ingresarProducto(producto:Producto) {
    this.productoService.ingresarProducto(producto).subscribe((response: any) => {
      const config = new MatSnackBarConfig();
      config.duration = 4000;
      this.snackBar.open('Datos guardados con éxito', 'Cerrar', config);

    }, error => {
      const config = new MatSnackBarConfig();
      config.duration = 4000;
      this.snackBar.open('Ocurrio un error al ingresar el producto.', 'Cerrar', error);
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row: Producto) => this.selection.select(row));
  }
}
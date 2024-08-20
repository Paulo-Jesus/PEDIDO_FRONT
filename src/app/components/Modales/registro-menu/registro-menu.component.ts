import { Dialog } from '@angular/cdk/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/Interfaces/Producto';
import { ModificarMenuComponent } from '../modificar-menu/modificar-menu.component';
import { TableColumn } from 'src/app/Interfaces/TableColumn';
import { Menu } from 'src/app/Interfaces/Menu';
import { MatPaginator } from '@angular/material/paginator';
interface Hora {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro-menu',
  templateUrl: './registro-menu.component.html',
  styleUrls: ['./registro-menu.component.css']
})
export class RegistroMenuComponent implements OnInit, AfterViewInit  {

  tableData: Array<Producto> = [];
  tableColumns: Array<TableColumn> =[
    { title:'Nombre', nameProperty:'nombre',fct: (element: Producto) =>`${element.nombre}` },
    { title:'Categoría', nameProperty:'categoria',fct: (element: Producto) =>`${element.categoria}` },
    { title:'Precio', nameProperty:'precio',fct: (element: Producto) =>`${element.precio}` },
    

  ];
  //paginator
  length! : number;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  form:FormGroup;
  selectedHoraI: string | undefined;
  selectedHoraF: string | undefined;
  selectedOption!:string;
  todayDate: string;
  datosTabla:any;

  formProducto: FormGroup;
  datosProducto: Producto[]=[];
  dataSourceProducto = new MatTableDataSource<Producto>(this.datosProducto);
  dataSource = new MatTableDataSource();
  

  horas: Hora[] = [];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _productoServicio: ProductoService
  ) { 
    this.todayDate = new Date().toLocaleDateString();
    this.form = this.fb.group({
      horaI:[''],
      horaF:[''],
    });
    this.formProducto= this.fb.group({
      id: [''],
      nombre: [''],
      descripcion: [''],
      categoria: [''],
      precio: ['']
      
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
    this.obtenerProductos(1)
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }
  obtenerProductos(id:number){
    this._productoServicio.obtenerProductos(id).subscribe({ next: (response) => {
        if (response.code) {
          this.tableData= response.data;
          console.log(this.tableData)
        } else {
          console.log('No se encontraron datos', 'Oops');
        }
      },

    })
  }
  openDialogAgregar() {
    this.dialog.open(AgregarMenuComponent, {
      width: '50vw',
      height:'70vh'
    });
  }
  openDialogModificar(nombre: string, categoria:string, precio:string){
    let objModificar = {nombre, categoria, precio}
    this.dialog.open(ModificarMenuComponent, {
      width: '50%',
      height:'70%',
      data: objModificar
    });
  }

  Eliminar(){
    //codigo para que no se refleje los datos 
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
}
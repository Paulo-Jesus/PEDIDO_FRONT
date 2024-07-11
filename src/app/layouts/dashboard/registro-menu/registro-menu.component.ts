import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarMenuComponent } from './agregar-menu/agregar-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { ModificarMenuComponent } from './modificar-menu/modificar-menu.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'categoria', 'precio' , 'opcion'];

  horas: Hora[] = [];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    throw new Error('Method not implemented.');
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
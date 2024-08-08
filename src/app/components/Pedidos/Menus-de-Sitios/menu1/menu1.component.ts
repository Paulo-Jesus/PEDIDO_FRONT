import { Component, OnInit } from '@angular/core';
import { IRestaurante } from 'src/app/Interfaces/IRestaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/Interfaces/Producto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {

  // data!:IRestaurante[];
  imgB64!: string;
  images: HTMLImageElement[] = [];
  load: boolean = false;

  datosProducto: Producto[] = [];
  dataSourceProducto = new MatTableDataSource<Producto>(this.datosProducto);
  formProducto: FormGroup
  constructor(
    private fb: FormBuilder,
    private _restauranteService: RestauranteService,
    private _productoServicio: ProductoService
  ) {
    this.formProducto = this.fb.group({
      id: [''],
      nombre: [''],
      descripcion: [''],
      categoria: [''],
      precio: [''],
      imagen: ['']
    });
  }

  ngOnInit() {
    // this.obtenerDatos();
    this.obtenerProductos(1);

  }

  obtenerProductos(id: number) {
    this._productoServicio.obtenerProductos(id).subscribe({
      next: (response) => {
        if (response.code) {
          this.datosProducto = response.data;
          this.dataSourceProducto.data = this.datosProducto;
          console.log(response)
        } else {
          console.log('No se encontraron datos', 'Oops');
        }
      },

    })
  }

  public obtenerDatos() {
    this.load = true;
    this._productoServicio.obtenerProductos(1).subscribe(response => {
      this.datosProducto = response.data
    //   for(let i = 0; i< this.datosProducto.length; i++){
    //     this.imgB64 = response.data[i].imagenBase64;
    //   this.datosProducto.forEach((producto, index) => {
    //   if (producto.imagenBase64) {
    //     this.b64ToImage(producto.imagenBase64, index);
    //   }
    // });
      
      this.load = false;
      console.log(response);
    })
  }


  filtrar() {
    

  }
  
  b64ToImage(imgB64: string, index: number) {
    let image = new Image();
    image.onload = () => {
      console.log("Imagen cargada", image);
    }
    image.src = `response.data:imagen/png;base64,${imgB64}`
    this.images[index] = image;

    const container = document.getElementById('image-container');
    if (container) {
      container.appendChild(image);
    }
    return image;

  }

  verMenu() { }
}

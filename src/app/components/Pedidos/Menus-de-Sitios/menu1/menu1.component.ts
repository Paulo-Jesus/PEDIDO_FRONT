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
  datosListadoProducto: Producto[] = [];
  dataSourceProducto = new MatTableDataSource<Producto>(this.datosProducto);
  dataSourceListadoProducto = new MatTableDataSource<Producto>(this.datosListadoProducto);
  formProducto: FormGroup
  formListadoProducto:FormGroup
  constructor(
    private fb: FormBuilder,
    private _restauranteService: RestauranteService,
    private _productoServicio: ProductoService
  ) {
    this.formProducto =this.createForm()
    this.formListadoProducto=this.createForm()
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
  

  ingresarProductos(producto: Producto) {
    this._productoServicio.ingresarProducto(producto).subscribe({
      next: (response) => {
        if (response.code) {
          this.datosListadoProducto = response.data;
          this.dataSourceProducto.data = this.datosListadoProducto;
          console.log(response)
        } else {
          console.log('No se encontraron datos', 'Oops');
        }
      },

    })

    
  }

  createForm(){
    return this.fb.group({
      id: [''],
      nombre: [''],
      descripcion: [''],
      categoria: [''],
      precio: [''],
      imagen: ['']

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


  addToMenu(){
    const valueForm: Producto = this.formListadoProducto.value
    
    if(this.datosListadoProducto==null){
      this._productoServicio.ingresarProducto(valueForm).subscribe
      ({
        next: (data) => {
          if (data.code) {
            this.formProducto.reset();
          } else {
            console.log("No se agrego el producto")
          }
        },
        error: (e) => { }
      });
    }

  }


}

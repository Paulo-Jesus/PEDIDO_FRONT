import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { TokenDecoderService } from 'src/app/services/Token/token-decoder.service';

interface Comida {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-menu',
  templateUrl: './agregar-menu.component.html',
  styleUrls: ['./agregar-menu.component.css']
})
export class AgregarMenuComponent implements OnInit {
  form: FormGroup = new FormGroup({ 
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl(),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    imagen: new FormControl()
  });

  tomarId!: '';
  Id: string = '';
  selectedValue: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<AgregarMenuComponent>,
    private productoService: ProductoService,
    private tokendecoder :TokenDecoderService,){}
  ngOnInit(): void {
    this.Id = this.tokendecoder.obtainID();
    console.log(this.Id)
  }
    
  imageUrl: string | undefined;
  

  comidas: Comida[] = [
    {value: '1', viewValue: 'Sopa'},
    {value: '2', viewValue: 'Segundo'},
    {value: '3', viewValue: 'Hamburguesa'},
    {value: '4', viewValue: 'Snack'},
    {value: '5', viewValue: 'Jugo'},
    {value: '6', viewValue: 'Bebida'},
    {value: '7', viewValue: 'Postre'},
  ];

  //Agregar una imagen
  handleImageChange(event: any) {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imageUrl = base64String.replace('data:image/jpeg;base64,', '');  
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No files selected');
    }
  }

  cancelar(){
    this.dialogRef.close(); 
  }

  Guardar(){
    const producto = new Producto();
    producto.Nombre = this.form.get('nombre')?.value;
    producto.Descripcion = this.form.get('descripcion')?.value;
    producto.Precio = parseFloat(this.form.get('precio')?.value);
    producto.ImagenBase64 = this.imageUrl;
    producto.IdCategoria = parseInt(this.form.get('categoria')?.value);
    producto.IdProveedor = parseInt(this.Id);
    producto.IdEstado = 1,  

    this.productoService.ingresarProducto(producto).subscribe(response =>{
      console.log(response);
      this.dialogRef.close();
    }, error => {
      console.error(error);
    });
  }
}


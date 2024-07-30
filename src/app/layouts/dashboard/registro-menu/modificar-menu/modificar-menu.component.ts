import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoService } from 'src/app/services/producto.service';

interface Comida {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modificar-menu',
  templateUrl: './modificar-menu.component.html',
  styleUrls: ['./modificar-menu.component.css']
})
export class ModificarMenuComponent {
  form: FormGroup = new FormGroup({ 
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    imagen: new FormControl(),
    Transaccion: new FormControl()
  });
  tomarId!: '';
  Id: string = '';
  selectedValue: string | undefined;
  productoService?: ProductoService;

  constructor(
    public dialogRef: MatDialogRef<ModificarMenuComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
     private productoservice: ProductoService
  ){
    this.selectedValue = `${this.data.idCategoria}`;
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

  validarNumero(event: any) {
    const inputChar = event.key;
    const currentValue = event.target.value;

    // Solo permitir números y un punto decimal
    if (!/^\d*\.?\d*$/.test(inputChar) && inputChar !== '') {
      event.preventDefault();
    }

    // Evitar múltiples puntos decimales
    if (inputChar === '.' && (currentValue === '' || currentValue.includes('.'))) {
      event.preventDefault();
    }
  }

  validarInput(event: any) {
    const currentValue = event.target.value;
    event.target.value = currentValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  }

  //Subir una imagen
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

    this.productoService?.ingresarProducto(producto).subscribe(response =>{
      console.log(response);
      this.dialogRef.close();
    }, error => {
      console.error(error);
    });
  }
  
  submit(){
    //Codigo para modificar y enviar los datos al back end
  }
}

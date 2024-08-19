import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
  selectedValue: string | undefined;
  constructor(public dialogRef: MatDialogRef<ModificarMenuComponent>){}
  imageUrl: string | undefined;

  comidas: Comida[] = [
    {value: '0', viewValue: 'Jugo'},
    {value: '1', viewValue: 'Sopa'},
    {value: '2', viewValue: 'Segundo'},
  ];

  //Subir una imagen
  handleImageChange(event: any) {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    } else {
      console.error('No files selected');
    }
  }

  cancelar(){
    this.dialogRef.close(); 
  }

  submit(){
    //Codigo para modificar y enviar los datos al back end
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IRestaurante } from 'src/app/interfaces/IRestaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  data!:IRestaurante[];
  imgB64! : string;
  images: HTMLImageElement[] = [];
  load:boolean=true;
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router:Router, 
    private _restauranteService:RestauranteService
  ) {
    this.form= this.fb.group({
      id: [''],
      nombre: [''],  
    });
  }

  ngOnInit() {
    this.obtenerDatos();
  }

  public obtenerDatos(){
    this.load = true;
    this._restauranteService.obtenerDatos().subscribe(response=>{
      this.data = response.data;
      for(let i = 0; i< this.data.length; i++){
        this.imgB64 = response.data[i].logotipo;
      }    
      this.load = false;  
      console.log(response);      
    })
  }

  filtrar(){

  }

  b64ToImage(imgB64:string, index:number){
    let image = new Image();
    image.onload = () =>{
      console.log("Imagen cargada",image);
    }
    image.src = 'response.data:logotipo/png;base64'+imgB64;
    this.images[index] = image;
    return image;
  }

  verMenu(){
    this.router.navigate(["home/pedidos/menu1"]);
  }
}

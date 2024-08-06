import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-recuperarClave',
  templateUrl: './recuperarClave.component.html',
  styleUrls: ['./recuperarClave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  form! : FormGroup;
  constructor(private fb:FormBuilder,private _loginService:LoginService) {
    this.form = this.fb.group({
      email : ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  generarClave(){
    console.log(this.form.value.Correo);
    this._loginService.recuperarClave(this.form.value.Correo).subscribe(
      (response) => {
        console.log('Correo Enviado');
      },
      (error) => {
        console.log('Correo no enviado', error);
      }
    );
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AuthGoogleService } from '../../../services/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  hide = true;
  form : FormGroup;
  isLoggedIn: boolean = false;
  lastLoggedInUser: string | null | undefined;

  constructor(
    private fb:FormBuilder,
    private _loginService:LoginService,
    private router:Router,
    private authGoogleService: AuthGoogleService
  ) {
    this.form = this.fb.group({
      nombreUsuario : new FormControl ('',Validators.required),
      clave : new FormControl ('',Validators.required)
    })
   }

   ngOnInit() {
    // Recuperar datos del último inicio de sesión desde localStorage
    this.lastLoggedInUser = localStorage.getItem('lastLoggedInUser');
  }



  onSubmit(){
    /*
    this._loginService.login(this.form.value).subscribe(response =>{
      console.log("Datos correctos");
      */
      this.router.navigate(['/home/seguridad/usuarios']);
      /*
    }, error =>{
      console.log("Datos incorrectos",error);
    });
    */
  }

  vistaRecuperarClave(){
    this.router.navigate(['/recuperar_clave']);
  }

  login() {
    const profileemail = localStorage.getItem("profileemail");
    if (profileemail !== null) {
      console.log("entro");
      const loginDTO = { Correo: profileemail, Contrasena: " "};
      console.log(loginDTO);
      this._loginService.loginGoogle(loginDTO).subscribe(response =>{
        console.log("Datos correctos");
        
        this.router.navigate(['/home/seguridad/usuarios']);
        
      }, error =>{
        console.log("Datos incorrectos",error);
      });
    }else {
      this.authGoogleService.login();
      this.login();
    }
  }
}

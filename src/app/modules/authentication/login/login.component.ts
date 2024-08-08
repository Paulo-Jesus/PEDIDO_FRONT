import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/Interfaces/LoginDTO';
import { LoginService } from 'src/app/services/login.service';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { CookieService } from 'Cookie/ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  usuario!:LoginDTO;
  hide = true;
  form : FormGroup;
  isLoggedIn: boolean = false;
  lastLoggedInUser: string | null | undefined;

  constructor(
    private fb:FormBuilder,
    private _loginService:LoginService,
    private router:Router,
    private authGoogleService: AuthGoogleService,
    private cookieService:CookieService
  ) {
    this.form = this.fb.group({
      Correo : new FormControl ('',Validators.required),
      Contrasena : new FormControl ('',Validators.required)
    })
   }

   roleId!: string;
   userName!: string;
   cookieValue!: string;
   decryptedString!: Object ;

   ngOnInit() {
    // Recuperar datos del último inicio de sesión desde localStorage
    this.lastLoggedInUser = localStorage.getItem('lastLoggedInUser');
  }



  onSubmit(){
    const LoginDTO = {Correo: this.form.value.Correo, Contrasena: this.form.value.Contrasena}
    this._loginService.login(LoginDTO).subscribe(response =>{
      // const decodedToken: DecodedToken = jwtDecode(response.data.token);
      
    // this.roleId = decodedToken.Rol;
    // this.userName = decodedToken.userName;

    this.cookieService.set('token',response.data.token,{
      secure: true,
      expires: new Date(Date.now()+360000),
    });
      this.router.navigate(['/home/seguridad']);
    });
      
  }

  vistaRecuperarClave(){
    this.router.navigate(['/recuperar_clave']);
  }

  login() {
    this.authGoogleService.login();
  }

}

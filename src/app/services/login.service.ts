import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from 'src/enviroments/enviroment';
import { Login_Usuario } from '../interfaces/Login_Usuario';
import { Router } from '@angular/router';
import { LoginDTO } from '../interfaces/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ApiUrl = Enviroment.endpoint;
  IniciarSesionGoogle = "/api/Login/IniciarSesionGoogle";
  

constructor(private http:HttpClient, private router:Router ) { }
  
loginGoogle(data: LoginDTO):Observable<LoginDTO>{
    return this.http.post<LoginDTO>(`${this.ApiUrl}${this.IniciarSesionGoogle}`, data);
  }
/*
  login(usuario:any):Observable<any>{
    const url = `${this.url}/validarLogin`; 
    return this.http.post<any>(this.url,usuario);
  }
    */

  logout(){
    this.router.navigate(['/login']);
  }
}

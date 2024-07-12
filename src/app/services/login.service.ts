import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from 'src/enviroments/enviroment';
import { Router } from '@angular/router';
import { LoginDTO } from '../interfaces/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ApiUrl = Enviroment.endpoint;
  IniciarSesion = "/api/Login/IniciarSesion";
  IniciarSesionGoogle = "/api/Login/IniciarSesionGoogle";
  RecuperarClave = "/api/Login/GenerarContrasena";
  ComprobarToken = "/api/Login/ComprobarToken";
  RestablecerContrasena = "/api/Login/RestablecerContrasena";

constructor(private http:HttpClient, private router:Router ) { }
  
login(data: LoginDTO):Observable<any>{
  return this.http.post<LoginDTO>(`${this.ApiUrl}${this.IniciarSesion}`, data);
}

loginGoogle(data: LoginDTO):Observable<any>{
    return this.http.post<LoginDTO>(`${this.ApiUrl}${this.IniciarSesionGoogle}`, data);
  }

  recuperarClave(Correo: string):Observable<string>{
    return this.http.post<string>(`${this.ApiUrl}${this.RecuperarClave}?Correo=${Correo}`, null);
  }

  comprobarToken(Token: string):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}${this.ComprobarToken}?TokenCuerpo=${Token}`, null);
  }

  restablecerClave(Token: string, ClaveTemporal:string, ClaveNueva: string):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}${this.RestablecerContrasena}?tokenCuerpo=${Token}&claveTemporal=${ClaveTemporal}&claveNueva=${ClaveNueva}`, null);
  }

  logout(){
    this.router.navigate(['/login']);
  }
}

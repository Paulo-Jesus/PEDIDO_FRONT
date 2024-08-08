import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { Enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private myAppUrl: string = Enviroment.endpoint;
  private myApiUrl: string = '/CrearPerfil/GetListEmpresas';

  constructor(private http:HttpClient) { }

  getEmpresas(): Observable<any> { 
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // updateRol(role: Role): Observable<any> {
  //   return this.http.put(`${this.myAppUrl}${this.myApiUrl}`, role);
  // }

  // addRol(role: Role): Observable<any> {
  //   return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, role);
  // }

}

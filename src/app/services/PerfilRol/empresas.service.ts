import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private ObtenerListaEmpresas =   Environment.ApiGetEmpresas;

  constructor(private http:HttpClient) { }

  getEmpresas(): Observable<any> { 
    return this.http.get(`${this.ObtenerListaEmpresas}`);
  }

  // updateRol(role: Role): Observable<any> {
  //   return this.http.put(`${this.myAppUrl}${this.myApiUrl}`, role);
  // }

  // addRol(role: Role): Observable<any> {
  //   return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, role);
  // }

}

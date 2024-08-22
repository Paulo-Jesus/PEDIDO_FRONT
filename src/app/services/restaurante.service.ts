import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { IRestaurante } from '../Interfaces/IRestaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private ApiRegistrar = Environment.ApiRegistrar;
  private ApigetRestaurantes = Environment.ApigetRestaurantes;

  url = Environment.endpoint;
  constructor(private http:HttpClient) { }

  public registrarDatos(datos : IRestaurante):Observable<Object>{
    const urlAPI = this.ApiRegistrar;
    return this.http.post(urlAPI,datos);
  }

  public obtenerDatos():Observable<any>{
    const urlAPI = this.ApigetRestaurantes;
    return this.http.get(urlAPI);
  }
}

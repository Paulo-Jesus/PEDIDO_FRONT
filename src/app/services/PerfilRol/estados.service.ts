import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private ObtenerListaEstado =   Enviroment.ApiObtenerListaEstado;

  constructor(private http:HttpClient) { }
  getEstado(): Observable<any> { 
    return this.http.get<any>(`${this.ObtenerListaEstado}`);
  }
}

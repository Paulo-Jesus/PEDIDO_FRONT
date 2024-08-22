import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private myAppUrl: string = Environment.endpoint;
  private ObtenerListaEstado =   Environment.ApiObtenerListaEstado;
  private myApiUrl: string= '/CrearPerfil/GetListEstados';

  constructor(private http:HttpClient) { }
  getEstado(): Observable<any> { 
    return this.http.get<any>(`${this.ObtenerListaEstado}`);
  }
}

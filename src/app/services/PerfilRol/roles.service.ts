import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/Interfaces/role';
import { Enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
  private myAppUrl: string = Enviroment.endpoint;
  private myApiUrl: string = '/CrearPerfil/GetListRoles';
  private ObtenerListaRoles =   Enviroment.ApiGetRoles;
  constructor(private http:HttpClient) { }

  getRoles(): Observable<any> { 
    return this.http.get(`${this.ObtenerListaRoles}`);
  }


  updateRol(role: Role): Observable<any> {
    return this.http.put(`${this.ObtenerListaRoles}`, role);
  }

  addRol(role: Role): Observable<any> {
    return this.http.post(`${this.ObtenerListaRoles}`, role);
  }

}

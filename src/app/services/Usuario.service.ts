import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = Enviroment.endpoint;

  constructor(private http:HttpClient) { }

  public obtenerTodos():Observable<any[]>{
    const urlApi = `${this.url}/UsuariosBloqueados`
    return this.http.get<any[]>(urlApi);
  }

  public obtenerPorNombreUsuario(nombreUsuario:string):Observable<any>{
    const urlApi = `${this.url}/BuscarUsuarioBloqueado/${nombreUsuario}`;
    const body = nombreUsuario;
    return this.http.post(urlApi,body);
  }

  public desbloquearCuenta(nombreUsuario:string):Observable<any>{
    const urlApi = `${this.url}/desbloquearUsuario/${nombreUsuario}`;
    const body = nombreUsuario;
    return this.http.put(urlApi,body);
  }

}

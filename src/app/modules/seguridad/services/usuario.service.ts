import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { ResponseApi, ResponseApiUsuario } from '../../../Interfaces/response';
import { Usuario, UsuarioEditar } from '../../../Interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = Environment.endpoint+"/api";
  url2 =Environment.endpoint

  constructor(private http:HttpClient) { }

  //usuarios
  public obtenerTodosUsuarios():Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/ObtenerTodos`
    return this.http.get<ResponseApiUsuario>(urlApi);
  }

  public BuscarUsuarios(params: any):Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/Buscar`
    return this.http.get<ResponseApiUsuario>(urlApi, {params});
  }
  public AgregarUsuarios(request:Usuario):Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/Agregar`
    return this.http.post<ResponseApiUsuario>(urlApi, request);
  }
  public EditarUsuarios(request:UsuarioEditar):Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/Editar`
    return this.http.get<ResponseApiUsuario>(urlApi);
  }
  public EliminarUsuarios(id:number ):Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/Eliminar`
    return this.http.get<ResponseApiUsuario>(urlApi);
  }




  //usuarios bloqueados

  public obtenerTodosBloqueados():Observable<ResponseApi>{
    const urlApi = `${this.url2}/UsuariosBloqueados`
    return this.http.get<ResponseApi>(urlApi);
  }

  

  public obtenerPorNombreUsuario(nombreUsuario:string):Observable<any>{
    const urlApi = `${this.url2}/BuscarUsuarioBloqueado/${nombreUsuario}`;
    const body = nombreUsuario;
    return this.http.post(urlApi,body);
  }

  public desbloquearCuenta(nombreUsuario:string):Observable<any>{
    const urlApi = `${this.url2}/desbloquearUsuario/${nombreUsuario}`;
    const body = nombreUsuario;
    return this.http.put(urlApi,body);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from 'src/enviroments/enviroment';
import { ResponseApi, ResponseApiUsuario } from '../Interfaces/response';
import { Usuario, UsuarioEditar } from '../Interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = Enviroment.endpoint;

  constructor(private http:HttpClient) { }

  //usuarios
  public obtenerTodosUsuarios():Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/ObtenerTodos`
    return this.http.get<ResponseApiUsuario>(urlApi);
  }

  public BuscarUsuarios(cedula:string, nombre:string,idEmpresa:number):Observable<ResponseApiUsuario>{
    const urlApi = `${this.url}/Usuarios/Buscar`
    return this.http.get<ResponseApiUsuario>(urlApi);
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

  public obtenerTodos():Observable<ResponseApi>{
    const urlApi = `${this.url}/UsuariosBloqueados`
    return this.http.get<ResponseApi>(urlApi);
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

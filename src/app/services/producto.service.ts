import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {  Environment } from 'src/environments/environment';
import { Producto } from '../Interfaces/Producto';
import { ResponseApi, ResponseApiProducto } from '../Interfaces/response';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private ObtenerProductos = Environment.ApiProductoObtener;
  private IngresarProductos = Environment.ApiProductoIngresar;
  private EstadoProducto = Environment.ApiProductoEstado;

  constructor(private http: HttpClient) { }


  
  obtenerProductos(id: number): Observable<ResponseApiProducto> {
    return this.http.get<ResponseApiProducto>(`${this.ObtenerProductos}/${id}`)

  }

  ingresarProducto(producto: Producto): Observable<ResponseApiProducto> {
    return this.http.post<ResponseApiProducto>(`${this.IngresarProductos}`, producto);
  }

  eliminarProducto(productoId: number, estado: number): Observable<any> {
    const params = new HttpParams()
      .set('productoId', productoId.toString())
      .set('estado', estado.toString());
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(this.EstadoProducto, null, { headers, params });
  }
}

  // obtenerProductos(id: number): Observable<Producto[]> {
  //   return this.http.get<any>(`${this.ObtenerProductos}/${id}`).pipe(
  //     map(response => response.data as Producto[])  // Mapea la propiedad 'data' del JSON a un array de Productos
  //   );
  // }

  // ingresarProducto(producto: Producto): Observable<any> {
  //   return this.http.post<any>(`${this.IngresarProductos}`, producto);
  // }

  // eliminarProducto(productoId: number, estado: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('productoId', productoId.toString())
  //     .set('estado', estado.toString());
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.put(this.EstadoProducto, null, { headers, params });
  // }}

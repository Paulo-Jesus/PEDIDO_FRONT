import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enviroment } from 'src/enviroments/enviroment';
import { Producto } from '../interfaces/Producto';
import { ResponseApi, ResponseApiProducto } from '../interfaces/response';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private ObtenerProductos = Enviroment.ApiProductoObtener;
  private IngresarProductos = Enviroment.ApiProductoIngresar;
  private EstadoProducto = Enviroment.ApiProductoEstado;

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

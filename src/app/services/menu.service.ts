import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enviroment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Menu } from '../Interfaces/Menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private IngresarMenu: string = Enviroment.endpoint;
  private ConsultaTieneMenu:string = Enviroment.ApiConsultaExisteMenu;
  private ObtenerMenu: string = Enviroment.ApiObtenerMenu;

  constructor(private http: HttpClient) { }

  ingresarMenu(idProveedor: number, horaInicio: string, horaFin: string, idProductos: number[]): Observable<any> {
    const url = `${this.IngresarMenu}?idProveedor=${idProveedor}&HoraInicio=${encodeURIComponent(horaInicio)}&HoraFin=${encodeURIComponent(horaFin)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, idProductos, { headers });
  }

  consultaTieneMenu(idProveedor: number) {
    return this.http.get<any>(`${this.ConsultaTieneMenu}/${idProveedor}`).pipe(
      map(response => response.data)  // Mapea la propiedad 'data' del JSON a un array de Productos
    );
  }

  obtenerProductosMenu(idProveedor: number): Observable<Menu> {
    return this.http.get<any>(`${this.ObtenerMenu}/${idProveedor}`).pipe(
      map(response => {
        let menu: Menu = {
          IdMenu: response.data[0].idMenu,
          IdProveedor: response.data[0].idProveedor,
          FechaInicio: response.data[0].fechaInicio,
          FechaFin: response.data[0].fechaFin,
          Platillos: response.data.map((producto: any) => producto.idProducto)
        };
        return menu;
      })
    );
  }

}
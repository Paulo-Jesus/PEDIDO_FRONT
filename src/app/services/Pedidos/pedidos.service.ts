import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pedidos } from 'src/app/interfaces/Pedidos';
import { pedidosInsertarDto } from 'src/app/interfaces/pedidosInsertarDto';
import { Enviroment } from 'src/enviroments/enviroment';
import { ResponseApiPedido } from 'src/app/interfaces/response';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private ObtenerPedidos =    Enviroment.ApiObtenerPedidos;
  private IngresarPedidos =   Enviroment.ApiPedidoInsertar;

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Pedidos[]> {
    console.log(this.ObtenerPedidos);
    return this.http.get<any>(`${this.ObtenerPedidos}`).pipe(
      map(response => response.data)
    );
  }

  getPedidosByDateRange(startDate: string, endDate: string): Observable<Pedidos[]> {
    return this.getPedidos().pipe(
      map(pedidos => pedidos.filter(pedido => {
        const fecha = new Date(pedido.fechaPedido.split('/').reverse().join('-')).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return fecha >= start && fecha <= end;
      }))
    );
  }

  ingresarPedidos(pedido: pedidosInsertarDto) : Observable<ResponseApiPedido> {
    return this.http.post<ResponseApiPedido>(`${this.IngresarPedidos}`, pedido)
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pedidos } from 'src/app/Interfaces/Pedidos';
import { pedidosInsertarDto } from 'src/app/Interfaces/pedidosInsertarDto';
import { ResponseApiPedido } from 'src/app/Interfaces/response';
import { Environment } from 'src/environments/environment';


@Injectable({

  providedIn: 'root'

})

export class PedidosService {

  private ObtenerPedidos =    Environment.ApiObtenerPedidos;
  private IngresarPedidos =   Environment.ApiPedidoInsertar;



  constructor(private http: HttpClient) { }

  getPedidos(id: string, rol: string): Observable<Pedidos[]> {

    const params = new HttpParams()

    .set('id', id.toString())
    .set('rol', rol);

  return this.http.get<any>(`${this.ObtenerPedidos}`, { params }).pipe(
    map(response => response.data)

  );

  }

  getPedidosByDateRange(startDate: string, endDate: string, id: string, rol: string): Observable<Pedidos[]> {

    return this.getPedidos(id,rol).pipe(

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
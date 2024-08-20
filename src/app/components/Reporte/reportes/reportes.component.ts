import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as saveAs from 'file-saver';
import { Pedidos } from 'src/app/Interfaces/Pedidos';
import { TableColumn } from 'src/app/Interfaces/TableColumn';
import { PedidosService } from 'src/app/services/Pedidos/pedidos.service';
import { TokenDecoderService } from 'src/app/services/Token/token-decoder.service';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit,AfterViewInit{

  
  tableData: Array<Pedidos> = [];
  tableColumns: Array<TableColumn> =[
    { title:'Fecha de Pedido', nameProperty:'fechaPedido',fct:(element: Pedidos) =>`${element.fechaPedido}` },
    { title:'Nombre', nameProperty:'nombreUsuario',fct: (element: Pedidos) =>`${element.nombreUsuario}` },
    { title:'Producto', nameProperty:'nombrePedido',fct: (element: Pedidos) =>`${element.nombrePedido}` },
    { title:'Precio', nameProperty:'precioProducto',fct: (element: Pedidos) =>`${element.precioProducto}` },
    { title:'Cantidad', nameProperty:'cantidad',fct:(element: Pedidos) =>`${element.cantidad}` },

  ];
  
  dataSource = new MatTableDataSource<Pedidos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  startDate: string = '';
  endDate: string = '';
  rol: string | undefined;
  Id: any;
  length! : number;
  load:boolean=false;

  constructor(private pedidosService: PedidosService,
    private tokendecoder: TokenDecoderService/*, private dateAdapter: DateAdapter<Date>*/ ) {
    // this.dateAdapter.setLocale('es');
  }

  
  ngOnInit(): void {
    this.getPedidos();
    this.length = this.tableData.length;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator
    =this.paginator;
  }


 
  getPedidos(): void {
    this.rol = this.tokendecoder.obtainRol();
    this.Id = this.tokendecoder.obtainID();
    this.pedidosService.getPedidos(this.Id, this.rol).subscribe(pedidos => {
      this.tableData = pedidos;
      console.log(this.tableData)
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort
    });

  }
  applyFilter(): void {
    this.rol = this.tokendecoder.obtainRol();
    this.Id = this.tokendecoder.obtainID();
    if (this.startDate && this.endDate) {
      this.pedidosService.getPedidosByDateRange(this.startDate, this.endDate, this.Id,  this.rol).subscribe(pedidos => {
        this.dataSource.data = pedidos;
      });
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }

  exportToExcel(): void {
    const data = this.tableData;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'pedidos');
  }
  

}

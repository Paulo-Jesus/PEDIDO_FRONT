import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import{saveAs} from 'file-saver';
import * as XLSX from "xlsx";
import { MatIconRegistry } from '@angular/material/icon';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Pedidos } from 'src/app/Interfaces/Pedidos';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { MatSort } from '@angular/material/sort';

import { TableColumn } from 'src/app/Interfaces/TableColumn';
import { TokenDecoderService } from 'src/app/modules/shared/services/token/token-decoder.service';

const MY_DATE_FORMATS = {

  parse: {

    dateInput: 'dd/MM/yyyy',

  },

  display: {

    dateInput: 'dd/MM/yyyy',

    monthYearLabel: 'MMM yyyy',

    dateA11yLabel: 'LL',

    monthYearA11yLabel: 'MMMM yyyy',

 },

};
@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.css']
})
export class HistorialPedidosComponent implements OnInit, AfterViewInit {


  startDate: string = '';
  endDate: string = '';
  rol: string | undefined;
  Id: any;
  tableData: Array<Pedidos> = [];
  tableColumns: Array<TableColumn> =[
    { title:'Fecha de Pedido', nameProperty:'fechaPedido',fct:(element: Pedidos) =>`${element.fechaPedido}` },
    { title:'Nombre', nameProperty:'nombreUsuario',fct: (element: Pedidos) =>`${element.nombreUsuario}` },
    { title:'Producto', nameProperty:'nombrePedido',fct: (element: Pedidos) =>`${element.nombrePedido}` },
    { title:'Precio', esNumber: true , nameProperty:'precioProducto',fct: (element: Pedidos) =>`${element.precioProducto}` },
    { title:'Cantidad', nameProperty:'cantidad',fct:(element: Pedidos) =>`${element.cantidad}` },

  ];
  
  dataSource = new MatTableDataSource<Pedidos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private pedidosService: PedidosService,private dateAdapter: DateAdapter<Date> ,
    private tokendecoder: TokenDecoderService ) {
      this.dateAdapter.setLocale('es');

  }

  
  ngOnInit(): void {
    this.getPedidos();
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
    
    });

  }
  applyFilter(): void {
    this.rol = this.tokendecoder.obtainRol();
    this.Id = this.tokendecoder.obtainID();
    if (this.startDate && this.endDate) {
      this.pedidosService.getPedidosByDateRange(this.startDate, this.endDate, this.Id,  this.rol).subscribe(pedidos => {
        this.tableData = pedidos;
        console.log(this.tableData)
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
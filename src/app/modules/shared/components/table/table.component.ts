
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/Interfaces/TableColumn';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit, OnChanges,AfterViewInit {

  @Input()
  tableColumns: Array<TableColumn> = [];

  @Input() acciones: boolean = false;

  @Input()
  tableData: any[] = [];

  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource();

esNumber? :boolean = false;
  pageSize: number = 0;
  length! : number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){
  }
  ngOnChanges(changes: SimpleChanges): void {
   if (changes['tableData']) {
    this.dataSource = new MatTableDataSource(this.tableData);
    
   }
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }

  // currencySign(){
  //   if(this.displayedColumns.values='Precio')
  //     this.cp.transform.(this.displayedColumns)
  // }

  ngOnInit():void {
    this.displayedColumns = this.tableColumns.map((c) => c.nameProperty);
    if(this.acciones){
      this.displayedColumns.unshift('acciones')
    }
    this.dataSource = new MatTableDataSource(this.tableData);
   
  }

}


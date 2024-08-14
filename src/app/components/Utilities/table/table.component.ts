import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/Interfaces/tableContent';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit {

  @Input()
  tableColumns: Array<TableColumn> = [];

  @Input()
  tableData: Array<T> = [];

  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource();

  constructor(){
  }
  ngOnInit():void {
    this.displayedColumns = this.tableColumns.map((c) => c.nameProperty);
    this.dataSource = new MatTableDataSource(this.tableData);
  }


  // @Input() displayedColumns: TableContent[] = []; 
  // @Input() dataSource: any[] = []; 
  // columns: string[]=[];

  // matDataSource = new MatTableDataSource<T>();

  // constructor(){
  //   this.columns=this.displayedColumns.map((data) => data.nameProperty)
  // }
  // ngOnInit() {
  //   this.matDataSource.data = this.dataSource;
  //   console.log(this.matDataSource.data)
  //   console.log(this.displayedColumns)
  // }
}


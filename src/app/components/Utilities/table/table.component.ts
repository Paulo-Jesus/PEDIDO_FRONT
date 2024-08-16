import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/Interfaces/TableColumn';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit, OnChanges {

  @Input()
  tableColumns: Array<TableColumn> = [];

  @Input()
  tableData: Array<T> = [];

  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource();

  constructor(){
  }
  ngOnChanges(changes: SimpleChanges): void {
   if (changes['tableData']) {
    this.dataSource = new MatTableDataSource(this.tableData);
    
   }
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


import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit {
  @Input() displayedColumns: string[] = []; // Las columnas a mostrar
  @Input() dataSource: T[] = []; // Los datos para la tabla

  matDataSource = new MatTableDataSource<T>();

  ngOnInit() {
    this.matDataSource.data = this.dataSource;
  }
}


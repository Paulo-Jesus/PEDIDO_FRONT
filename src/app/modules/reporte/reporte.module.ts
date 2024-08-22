import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';

import { ReportesComponent } from './pages/reportes/reportes.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    SharedModule
    
  ]
})
export class ReporteModule { }

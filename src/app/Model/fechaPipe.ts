import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'fechaPipe'
  })
  export class FechaPipe implements PipeTransform {
    transform(fecha: string): Date {
      const fechaParts = fecha.split('/');
      const dia = parseInt(fechaParts[0], 10);
      const mes = parseInt(fechaParts[1], 10) - 1; // Meses en JavaScript son 0-based
      const anio = parseInt(fechaParts[2], 10);
      return new Date(anio, mes, dia);
    }
  }
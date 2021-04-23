import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechanac'
})
export class FechaNacimientoPipe implements PipeTransform {

  transform(fecha: string): string {
    let fechaActual: Date = new Date();
    let fechaNac: Date = new Date(fecha)
    let anios: number = fechaActual.getFullYear() - fechaNac.getFullYear();

    fechaNac.setFullYear(fechaActual.getFullYear());
    if (fechaActual < fechaNac){
      --anios;
    }
    return `${anios} años`;
  }
}

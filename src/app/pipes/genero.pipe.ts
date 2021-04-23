import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: string, parametro: string): string {
    if (parametro === 'M'){
      return 'Masculino';
    }else {
      return 'Femenino';
    }
  }

}

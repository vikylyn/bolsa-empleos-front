import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionFormularioService {

  constructor() { }

  soloLetras(event) {
    return ((event.charCode == 241)||(event.charCode == 32) || (event.charCode >= 97 && event.charCode <= 122)||(event.charCode >= 65 && event.charCode <= 90))
  }

  direccion(event) {
    return ((event.charCode == 241)||(event.charCode >= 48 && event.charCode <= 57)||(event.charCode == 167)||(event.charCode == 35)||(event.charCode == 32)||(event.charCode >= 97 && event.charCode <= 122)||(event.charCode >= 65 && event.charCode <= 90))
  }
  descripcion(event) {
    return ((event.charCode == 241)||(event.charCode >= 48 && event.charCode <= 57)||(event.charCode == 46)||(event.charCode == 32)||(event.charCode >= 97 && event.charCode <= 122)||(event.charCode >= 65 && event.charCode <= 90))
  }
  letraYpunto(event) {
    return ((event.charCode == 241)||(event.charCode == 46)||(event.charCode == 32)||(event.charCode >= 97 && event.charCode <= 122)||(event.charCode >= 65 && event.charCode <= 90))
  }

  soloNumeros(event) {
    return (event.charCode >= 48 && event.charCode <= 57);
  }
}

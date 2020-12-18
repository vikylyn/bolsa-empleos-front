import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IdiomaService } from '../../../../../services/solicitante/curriculum/idioma.service';
import { NivelIdioma } from '../../../../../models/idioma/nivel-idioma.model';
import { Idioma } from '../../../../../models/idioma/idioma.model';
import { RequisitosIdioma } from '../../../../../models/empleador/requisitos-idioma.model';

@Component({
  selector: 'app-idioma-vacante',
  templateUrl: './idioma-vacante.component.html',
  styles: [
  ]
})
export class IdiomaVacanteComponent implements OnInit {
  @Input() visible: boolean;
  @Input()   idiomasSeleccionados: RequisitosIdioma[];
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() guardarIdioma: EventEmitter<RequisitosIdioma> = new EventEmitter();

  nivelesIdioma: NivelIdioma[];
  idiomas: Idioma[] = [];

  idiomaSeleccionado: Idioma;
  nivelEscrito: NivelIdioma;
  nivelLectura: NivelIdioma;
  nivelOral: NivelIdioma;

  // para validaciones
  idioma = false;
  escrito = false;
  oral = false;
  lectura = false;

  constructor(private idiomaService: IdiomaService) { }

  ngOnInit(): void {
    this.cargarNiveles();
    this.cargarIdiomas();
  }
  cargarNiveles(): void {
    this.idiomaService.listarNiveles().subscribe(({niveles_idioma}) => {
      this.nivelesIdioma = niveles_idioma;
    });
  }

  cargarIdiomas(): void {
    this.idiomaService.listarIdiomas().subscribe(({idiomas}) => {
      if (this.idiomasSeleccionados.length > 0) {
        this.idiomasSeleccionados.forEach(element => {
          idiomas = this.removerElemento(idiomas, element.idioma);
        });
        this.idiomas = idiomas;

      }else {
        this.idiomas = idiomas;
      }

    });
  }
  removerElemento( arr: Idioma[], item: Idioma ) {
    return arr.filter( ( e: Idioma ) => {
        return e.nombre !== item.nombre;
    });
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  guardar(): any{
    let enviarFormulario = true;
    if (!this.idiomaSeleccionado) {
      enviarFormulario = false;
      this.idioma = true;
    }
    if (!this.nivelEscrito) {
      enviarFormulario = false;
      this.escrito = true;
    }
    if (!this.nivelOral) {
      enviarFormulario = false;
      this.oral = true;
    }
    if (!this.nivelLectura) {
      enviarFormulario = false;
      this.lectura = true;
    }
    if (enviarFormulario){
      this.guardarIdioma.emit(new RequisitosIdioma(this.idiomaSeleccionado, this.nivelEscrito, this.nivelOral, this.nivelLectura));
      this.cerrarModal();
    }else {
      console.log('hacer validaciones!1');
    }
  }
  idiomaValido(item: Idioma) {
    if (item) {
      this.idioma = false;
    }else {
      this.idioma = true;
    }
  }
  nivelLecturaValido(nivel: NivelIdioma) {
    if (nivel) {
      this.lectura = false;
    }else {
      this.lectura = true;
    }
  }

  nivelEscritoValido(nivel: NivelIdioma) {
    if (nivel) {
      this.escrito = false;
    }else {
      this.escrito = true;
    }
  }
  nivelOralValido(nivel: NivelIdioma) {
    if (nivel) {
      this.oral = false;
    }else {
      this.oral = true;
    }
  }

}

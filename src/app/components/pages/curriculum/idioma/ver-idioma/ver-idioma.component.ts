import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurriculumIdioma } from '../../../../../models/curriculum/curriculum-idioma.model';
import { IdiomaService } from '../../../../../services/solicitante/curriculum/idioma.service';

@Component({
  selector: 'app-ver-idioma',
  templateUrl: './ver-idioma.component.html',
  styles: [
  ]
})
export class VerIdiomaComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idIdioma: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  idioma: CurriculumIdioma;
  cargandoModal = true;
  constructor(private idiomaService: IdiomaService) {
   }

  ngOnInit(): void {
    this.cargarExperiencia();

  }
  cargarExperiencia(): void {
    this.idiomaService.buscar(this.idIdioma).subscribe(( resp: CurriculumIdioma) => {
      this.idioma = resp;
      this.cargandoModal = false;
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }


}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstudioBasico } from '../../../../models/curriculum/estudio-basico.model';
import { EstudioBasicoService } from '../../../../services/solicitante/curriculum/estudio-basico.service';

@Component({
  selector: 'app-ver-estudio-basico',
  templateUrl: './ver-estudio-basico.component.html',
  styles: [
  ]
})
export class VerEstudioBasicoComponent implements OnInit {

  @Input() visible: boolean;
  @Input() idEstudio: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  estudio: EstudioBasico;

  constructor(private estudioService: EstudioBasicoService) {
   }

  ngOnInit(): void {
    this.cargarExperiencia();

  }
  cargarExperiencia(): void {
    this.estudioService.buscar(this.idEstudio).subscribe(( resp: EstudioBasico) => {
      this.estudio = resp;
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }


}

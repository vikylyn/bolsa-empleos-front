import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EstudioAvanzado } from '../../../../models/curriculum/estudio-avanzado.model';
import { EstudioAvanzadoService } from '../../../../services/solicitante/curriculum/estudio-avanzado.service';

@Component({
  selector: 'app-ver-estudio-avanzado',
  templateUrl: './ver-estudio-avanzado.component.html',
  styles: [
  ]
})
export class VerEstudioAvanzadoComponent implements OnInit {

  @Input() visible: boolean;
  @Input() idEstudio: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  estudio: EstudioAvanzado;

  constructor(private estudioService: EstudioAvanzadoService) {
   }

  ngOnInit(): void {
    this.cargarExperiencia();

  }
  cargarExperiencia(): void {
    this.estudioService.buscar(this.idEstudio).subscribe(( resp: EstudioAvanzado) => {
      this.estudio = resp;
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

}

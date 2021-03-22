import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vacante } from '../../../../models/empleador/vacante.model';
import { VacanteService } from '../../../../services/vacante/vacante.service';

@Component({
  selector: 'app-ver-vacante-empleador',
  templateUrl: './ver-vacante-empleador.component.html'
})
export class VerVacanteEmpleadorComponent implements OnInit {

  @Input() visible: boolean;
  @Input() idVacante: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  vacante: Vacante;

  constructor(private vacanteService: VacanteService) {
   }

  ngOnInit(): void {
    this.cargarVacante();

  }
  cargarVacante(): void {
    this.vacanteService.buscar(this.idVacante).subscribe(( resp: Vacante) => {
      this.vacante = resp;
      console.log(this.vacante);
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }


}

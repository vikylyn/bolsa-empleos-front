import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contratacion } from 'src/app/models/empleador/contratacion.model';
import { ContratacionService } from '../../../../services/vacante/contratacion.service';

@Component({
  selector: 'app-ver-contratacion',
  templateUrl: './ver-contratacion.component.html',
  styles: [
  ]
})
export class VerContratacionComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idContratacion: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  contratacion: Contratacion;

  constructor(private contratacionService: ContratacionService) {
   }

  ngOnInit(): void {
    this.cargarContratacion();

  }
  cargarContratacion(): void {
    this.contratacionService.buscar(this.idContratacion).subscribe(({contratacion}) => {
      this.contratacion = contratacion;
      console.log(this.contratacion);
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }

}

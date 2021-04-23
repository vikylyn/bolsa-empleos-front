import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContratacionService } from '../../../../../services/vacante/contratacion.service';
import { Contratacion } from '../../../../../models/empleador/contratacion.model';

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

  myModal = false;
  cargando = true;
  contratacion: Contratacion;

  constructor(private contratacionService: ContratacionService) {
   }

  ngOnInit(): void {
    this.cargarContratacion();

  }
  cargarContratacion(): void {
    this.cargando = true;
    this.contratacionService.buscar(this.idContratacion).subscribe(({contratacion}) => {
      this.contratacion = contratacion;
      console.log(this.contratacion);
      this.cargando = false;
    });
  }
  mostrarModal() {
    this.myModal = true;
  }

  cerrarModal(e) {
    this.myModal = e;
    this.cerrar.emit(e);
  }
  cancelarModal(e) {
    this.myModal = e;
  }

  cerrarModalPadre() {
    this.cancelar.emit(false);
  }

}

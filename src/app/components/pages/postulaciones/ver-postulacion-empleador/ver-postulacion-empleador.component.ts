import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';

@Component({
  selector: 'app-ver-postulacion-empleador',
  templateUrl: './ver-postulacion-empleador.component.html',
  styles: [
  ]
})
export class VerPostulacionEmpleadorComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idPostulacion: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  myModal = false;
  postulacion: Postulacion;
  cargando = true;
  constructor(private postulacionService: PostulacionService) { }

  ngOnInit(): void {
    this.cargarPostulacion();
  }
  cargarPostulacion(): void {
    this.cargando = true;
    this .postulacionService.buscar(this.idPostulacion).subscribe(({postulacion}) => {
      this.postulacion = postulacion;
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
   // this.cancelar.emit(false);
  }

  cancelarModalPadre(e) {
    this.cancelar.emit(false);
  }



}

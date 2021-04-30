import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contratacion } from '../../../../../models/empleador/contratacion.model';
import { ContratacionService } from '../../../../../services/vacante/contratacion.service';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../../../../services/vacante/postulacion.service';
import { Postulacion } from '../../../../../models/empleador/postulacion.model';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styles: [
  ]
})
export class OperacionesComponent implements OnInit {
  @Input() idSolicitante: number;
  @Input() id: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cargar: EventEmitter<boolean> = new EventEmitter();
  @Output() noCargar: EventEmitter<boolean> = new EventEmitter();

  contratacion: Contratacion;
  postulacion: Postulacion;


  constructor(private contratacionService: ContratacionService,
              private  postulacionService: PostulacionService) { }

  ngOnInit(): void {
    if (this.tipoOperacion === 'contratacion') {
      this.contratacionService.buscar(this.id)
          .subscribe(({contratacion}) => {
            this.contratacion = contratacion;
          });
    }else if (this.tipoOperacion === 'postulacion') {
      this.postulacionService.buscar(this.id)
          .subscribe(({postulacion}) => {
            this.postulacion = postulacion;
          });
    }
  }

  contratar(): void {
    Swal.fire({
      title: '¿Desea contratar al postulante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargar.emit();
        this.postulacionService.aceptar(this.id)
            .subscribe((resp: any) => {
              Swal.fire(resp.mensaje, '', 'success');
              this.noCargar.emit();
              this.cerrarModalPadre();
            }, (err) => {
              console.log(err);
              Swal.fire('Error al contratar solicitante', err.error.error.error || err.error.error || err.error.mensaje, 'error');
              this.noCargar.emit();
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }
/*  contratarRechazado(): void {
    this.postulacionService.aceptarRechazado(this.id)
        .subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cerrarModalPadre();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al contratar solicitante', err.error.error.error || err.error.error || err.error.mensaje, 'error');
        });
  }
*/
  rechazar(): void {

    Swal.fire({
      title: '¿Estás seguro de rechazar la postulación?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargar.emit();
        this.postulacionService.rechazarPostulacionEmpleador(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.noCargar.emit();
          this.cerrarModalPadre();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al rechazar postulación', err.error.error || err.error.mensaje, 'error');
          this.noCargar.emit();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }

  rechazarConsiderado(): void {

    Swal.fire({
      title: '¿Estás seguro de rechazar la postulación?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargar.emit();
        this.postulacionService.rechazarAceptado(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.noCargar.emit();
          this.cerrarModalPadre();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al rechazar postulación', err.error.error || err.error.mensaje, 'error');
          this.noCargar.emit();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }
// terminar con la contratacion
// eliminar la postulacion que no ha sido aceptada por el empleador
  terminar(): void {
    Swal.fire({
      title: '¿Estás seguro de terminar el contrato?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargar.emit();
        this.contratacionService.desvincularSolicitante(this.contratacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.noCargar.emit();
          this.cerrarModalPadre();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar contratación', err.error.error || err.error.mensaje, 'error');
          this.noCargar.emit();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }

  cerrarModalPadre() {
    this.cerrar.emit(false);
  }
}

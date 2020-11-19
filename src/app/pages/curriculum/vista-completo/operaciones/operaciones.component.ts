import { Component, Input, OnInit} from '@angular/core';
import { Contratacion } from '../../../../models/empleador/contratacion.model';
import { ContratacionService } from '../../../../services/vacante/contratacion.service';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { Postulacion } from '../../../../models/empleador/postulacion.model';

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
          .subscribe(({contratacion}) => {
            this.contratacion = contratacion;
          });
    }
  }

  contratar(): void {
    this.postulacionService.aceptar(this.id)
        .subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al contratar solicitante', err.error.error.error || err.error.error || err.error.mensaje, 'error');
        });
  }
  rechazar(): void {

    Swal.fire({
      title: 'Estas seguro de eliminar la contratacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.rechazar(this.contratacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al rechazar postulacion', err.error.error || err.error.mensaje, 'error');
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
      title: 'Estas seguro de terminar el contrato?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.contratacionService.desvincularSolicitante(this.contratacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar postulacion', err.error.error || err.error.mensaje, 'error');
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
}

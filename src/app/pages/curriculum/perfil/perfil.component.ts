import { Component, OnInit } from '@angular/core';
import { CurriculumService } from 'src/app/services/solicitante/curriculum/curriculum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculum } from '../../../models/curriculum/curriculum.model';
import { Postulacion } from '../../../models/empleador/postulacion.model';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import Swal from 'sweetalert2';
import { Contratacion } from '../../../models/empleador/contratacion.model';
import { PostulacionService } from '../../../services/vacante/postulacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  curriculum: Curriculum;
  tipo: string;
  contratacion: Contratacion;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private curriculumService: CurriculumService,
              private postulacionService: PostulacionService,
              private contratacionService: ContratacionService) { }

  ngOnInit(): void {
    this.tipo = this.route.snapshot.params.tipo;
    if (this.tipo === 'contratacion') {
      this.contratacionService.buscar(this.route.snapshot.params.id_postulacion_contratacion)
          .subscribe(({contratacion}) => {
            this.contratacion = contratacion;
          });
    }
    this.curriculumService.buscarPorIdSolicitanteCompleto(this.route.snapshot.params.id_solicitante)
        .subscribe(({curriculum}) => {
          this.curriculum = curriculum;
          console.log('Curriculum', this.curriculum);

        });
  }

  contratar(): void {
    this.postulacionService.aceptar(this.route.snapshot.params.id_postulacion_contratacion)
        .subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.router.navigateByUrl('/postulaciones-empleador');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al contratar solicitante', err.error.error.error || err.error.error || err.error.mensaje, 'error');
        });
  }
  eliminar(): void {

 /*   Swal.fire({
      title: 'Estas seguro de eliminar la contratacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.contratacionService.eliminar(this.contratacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.router.navigateByUrl('/contrataciones-empleador');

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
*/
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
          this.router.navigateByUrl('/contrataciones-empleador');
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

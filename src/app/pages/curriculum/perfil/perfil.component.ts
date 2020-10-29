import { Component, OnInit } from '@angular/core';
import { CurriculumService } from 'src/app/services/solicitante/curriculum/curriculum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculum } from '../../../models/curriculum/curriculum.model';
import { Postulacion } from '../../../models/empleador/postulacion.model';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  curriculum: Curriculum;
  tipo: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private curriculumService: CurriculumService,
              private contratacionService: ContratacionService) { }

  ngOnInit(): void {
    this.tipo = this.route.snapshot.params.tipo;
    this.curriculumService.buscarPorIdSolicitanteCompleto(this.route.snapshot.params.id_solicitante)
        .subscribe(({curriculum}) => {
          this.curriculum = curriculum;
          console.log('Curriculum', this.curriculum);

        });
  }

  contratar(): void {
    this.contratacionService.contratar(this.route.snapshot.params.id_postulacion_contratacion)
        .subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.router.navigateByUrl('/postulaciones-empleador');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al contratar solicitante', err.error.error.error || err.error.error || err.error.mensaje, 'error');
        });
  }
// terminar con la contratacion
terminar(): void {

  Swal.fire({
    title: 'Desea terminar el contrato?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
   /*   this.contratacionService.eliminar(this.route.snapshot.params.id_postulacion_contratacion).subscribe((resp: any) => {
        Swal.fire(resp.mensaje, '', 'success');
        this.router.navigateByUrl('/contrataciones-empleador');
      }, (err) => {
        console.log(err);
        Swal.fire('Error al eliminar postulacion', err.error.error || err.error.mensaje, 'error');
      });
    */  } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        '',
        'error'
      );
    }
  });
}
}

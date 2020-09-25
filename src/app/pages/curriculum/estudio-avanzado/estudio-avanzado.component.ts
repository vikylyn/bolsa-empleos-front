import { Component, OnInit } from '@angular/core';
import { EstudioAvanzado } from '../../../models/curriculum/estudio-avanzado.model';
import { EstudioAvanzadoService } from '../../../services/solicitante/curriculum/estudio-avanzado.service';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudio-avanzado',
  templateUrl: './estudio-avanzado.component.html',
  styles: [
  ]
})
export class EstudioAvanzadoComponent implements OnInit {

  id_curriculum: number;
  estudios_avanzados: EstudioAvanzado[];
  desde = 0;
  cargando = true;
  totalEstudios = 0;


  constructor(private estudioService: EstudioAvanzadoService,
              private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router) { }
  ngOnInit(): void {
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.id_curriculum = resp.curriculum.id;
        this.cargarEstudios();
      }
    });

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalEstudios) {
      this.desde -= valor;
    }
    this.cargarEstudios();
  }

  cargarEstudios(): void {
    this.cargando = true;
    this.estudioService.listar(this.id_curriculum, this.desde)
    .subscribe(({total, estudios_avanzados}) => {
      this.estudios_avanzados = estudios_avanzados;
      this.totalEstudios = total;
      this.cargando = false;
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Se eliminara el Estudio Avanzado seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.estudioService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargarEstudios();
        },(err) => {
          console.log(err);
          Swal.fire('Error al eliminar Estudio Avanzado', err.error.error || err.error.mensaje, 'error');
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

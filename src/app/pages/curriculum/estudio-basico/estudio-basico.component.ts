import { Component, OnInit } from '@angular/core';
import { EstudioBasico } from '../../../models/curriculum/estudio-basico.model';
import { EstudioBasicoService } from '../../../services/solicitante/curriculum/estudio-basico.service';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudio-basico',
  templateUrl: './estudio-basico.component.html',
  styles: [
  ]
})
export class EstudioBasicoComponent implements OnInit {


  id_curriculum: number;
  estudios_basicos: EstudioBasico[];
  desde = 0;
  cargando = true;
  totalEstudios = 0;


  constructor(private estudioService: EstudioBasicoService,
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
    .subscribe(({total, estudios_basicos}) => {
      this.estudios_basicos = estudios_basicos;
      this.totalEstudios = total;
      this.cargando = false;
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Se eliminara el Estudio basico seleccionado',
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
          Swal.fire('Error al eliminar Estudio Basico', err.error.error || err.error.mensaje, 'error');
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

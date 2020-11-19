import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboralService } from '../../../services/solicitante/curriculum/experiencia-laboral.service';
import { ExperienciaLaboral } from '../../../models/curriculum/experiencia-laboral.model';
import Swal from 'sweetalert2';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styles: [
  ]
})
export class ExperienciaLaboralComponent implements OnInit {
  myModal = false;
  myModal2 = false;
  idCurriculum: number;
  idExperiencia: number;
  tipoOperacion: string;
  experiencias: ExperienciaLaboral[];
  desde = 0;
  cargando = true;
  totalExperiencias = 0;


  constructor(private experienciaService: ExperienciaLaboralService,
              private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.idCurriculum = resp.curriculum.id;
        this.cargarExperiencias();
      }
    });

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalExperiencias) {
      this.desde -= valor;
    }
    this.cargarExperiencias();
  }

  cargarExperiencias(): void {
    this.cargando = true;
    this.experienciaService.listar(this.idCurriculum, this.desde)
    .subscribe(({total, experiencias}) => {
      this.experiencias = experiencias;
      this.totalExperiencias = total;
      this.cargando = false;
    });
  }
  busqueda(nombre: string): any {
   /* if (nombre.length === 0) {
      return this.areas =  this.areasTemp;
    }
    console.log(nombre);
    this.areaLaboral.busqueda(nombre).subscribe(
      (resp: AreaLaboral[]) => {
        this.areas = resp;
      }
    );
    */
  }
  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se eliminara la experiencia laboral',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.experienciaService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargarExperiencias();
        },(err) => {
          console.log(err);
          Swal.fire('Error al eliminar Experiencia', err.error.error || err.error.mensaje, 'error');
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

  mostrarModal(tipoOperacion: string, idExperiencia: number) {
    this.tipoOperacion = tipoOperacion;
    this.idExperiencia = idExperiencia;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarExperiencias();
  }

  mostrarModal2(idExperiencia: number) {
    this.idExperiencia = idExperiencia;
    this.myModal2 = true;
  }
  cerrarModal2(e) {
    this.myModal2 = e;
  }

  cancelarModal(e) {
    this.myModal = e;
  }
}

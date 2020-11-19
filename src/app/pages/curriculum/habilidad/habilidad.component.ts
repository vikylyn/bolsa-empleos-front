import { Component, OnInit, Input } from '@angular/core';
import { HabilidadService } from '../../../services/solicitante/curriculum/habilidad.service';
import { CurriculumHabilidad } from '../../../models/curriculum/curriculum-habilidad.model';
import Swal from 'sweetalert2';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styles: [
  ]
})
export class HabilidadComponent implements OnInit {
  myModal = false;
  id_curriculum: number;
  habilidades: CurriculumHabilidad[];
  desde = 0;
  cargando = true;
  totalHabilidades = 0;


  constructor(private habilidadService: HabilidadService,
              private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.id_curriculum = resp.curriculum.id;
        this.cargarHabilidades();
      }
    });

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalHabilidades) {
      this.desde -= valor;
    }
    this.cargarHabilidades();
  }

  cargarHabilidades(): void {
    this.cargando = true;
    this.habilidadService.listar(this.id_curriculum, this.desde)
    .subscribe(({total, habilidades}) => {
      this.habilidades = habilidades;
      this.totalHabilidades = total;
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
      title: 'Estas seguro?',
      text: 'Se eliminara la habilidad Asignada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.habilidadService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargarHabilidades();
        },(err) => {
          console.log(err);
          Swal.fire('Error al eliminar Habilidad', err.error.error || err.error.mensaje, 'error');
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

  mostrarModal() {
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarHabilidades();
  }
  cancelarModal(e) {
    this.myModal = e;
  }
}

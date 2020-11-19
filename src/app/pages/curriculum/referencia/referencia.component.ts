import { Component, OnInit, Input } from '@angular/core';
import { Referencia } from '../../../models/curriculum/referencia.model';
import { ReferenciaService } from '../../../services/solicitante/curriculum/referencia.service';
import Swal from 'sweetalert2';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styles: [
  ]
})
export class ReferenciaComponent implements OnInit {
  myModal = false;
  myModal2 = false;
  idCurriculum: number;
  idReferencia: number;
  tipoOperacion: string;
  referencias: Referencia[];
  desde = 0;
  cargando = true;
  totalReferencias = 0;


  constructor(private referenciaService: ReferenciaService,
              private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router) { }
  ngOnInit(): void {
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.idCurriculum = resp.curriculum.id;
        this.cargarReferencias();
      }
    });

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalReferencias) {
      this.desde -= valor;
    }
    this.cargarReferencias();
  }

  cargarReferencias(): void {
    this.cargando = true;
    this.referenciaService.listar(this.idCurriculum, this.desde)
    .subscribe(({total, referencias}) => {
      this.referencias = referencias;
      this.totalReferencias = total;
      this.cargando = false;
    });
  }
  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Se eliminara la Referencia Asignada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.referenciaService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargarReferencias();
        },(err) => {
          console.log(err);
          Swal.fire('Error al eliminar Referencia', err.error.error || err.error.mensaje, 'error');
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

  mostrarModal(tipoOperacion: string, idReferencia: number) {
    this.tipoOperacion = tipoOperacion;
    this.idReferencia = idReferencia;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarReferencias();
  }
  mostrarModal2(idReferencia: number) {
    this.idReferencia = idReferencia;
    this.myModal2 = true;
  }
  cerrarModal2(e) {
    this.myModal2 = e;
  }
  cancelarModal(e) {
    this.myModal = e;
  }

}

import { Component, OnInit } from '@angular/core';
import { Postulacion } from '../../../models/empleador/postulacion.model';
import { PostulacionService } from '../../../services/vacante/postulacion.service';
import { LoginService } from '../../../services/login.service';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulaciones-pendientes-solicitante',
  templateUrl: './postulaciones-pendientes-solicitante.component.html',
  styles: [
  ]
})
export class PostulacionesPendientesSolicitanteComponent implements OnInit {

  myModal = false;
  idVacante: number;
  desde = 0;
  totalPostulaciones = 0;
  postulaciones: Postulacion [];
  postulacionesTemp: Postulacion [];
  cargando = true;
  constructor(private postulacionService: PostulacionService,
              private loginService: LoginService,
              private contratacionService: ContratacionService,) {
                this.cargarPostulaciones();
              }

  ngOnInit(): void {
  }
  cargarPostulaciones(): void {
    this.cargando = true;
    this.postulacionService.listarPendientesPorIdSolicitante(this.loginService.solicitante.id, this.desde)
        .subscribe(({total, postulaciones}) => {
          console.log(postulaciones);
          this.totalPostulaciones = total;
          this.postulaciones = postulaciones;
          this.cargando = false;
        });
  }

  busqueda(nombre: string): any {
 /*   if (nombre.length === 0) {
      return this.administradores =  this.adminTemp;
    }
    this.administradorService.busqueda(nombre).subscribe(
      (resp: Administrador[]) => {
        this.administradores = resp;
      }
    );
    */
  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalPostulaciones) {
      this.desde -= valor;
    }
    this.cargarPostulaciones();
  }

  // eliminar la postulacion que no ha sido aceptada por el empleador
  eliminar(id_postulacion: number): void {

    Swal.fire({
      title: 'Estas seguro de eliminar su postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.eliminar(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarPostulaciones();
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

  confirmar(id_postulacion: number): void {
    Swal.fire({
      title: 'Desea confirmar su postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.confirmar(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al confirmar postulacion', err.error.error || err.error.mensaje, 'error');
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

  rechazar(id_postulacion: number): void {
    Swal.fire({
      title: 'Desea rechazar su postulacion?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.contratacionService.rechazar(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al confirmar postulacion', err.error.error || err.error.mensaje, 'error');
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

  

  mostrarModal(idVacante: number) {
    this.idVacante = idVacante;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
  }
}

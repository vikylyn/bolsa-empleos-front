import { Component, OnInit } from '@angular/core';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { LoginService } from '../../../../services/login.service';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import Swal from 'sweetalert2';
import { ContratacionService } from '../../../../services/vacante/contratacion.service';

@Component({
  selector: 'app-postulacion-solicitante',
  templateUrl: './postulacion-aceptadas-solicitante.component.html',
  styles: [
  ]
})
export class PostulacionSolicitanteComponent implements OnInit {
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
    this.postulacionService.listarConsideradosPorIdSolicitante(this.loginService.solicitante.id, this.desde)
        .subscribe(({total, postulaciones}) => {
          console.log(postulaciones);
          this.totalPostulaciones = total;
          this.postulaciones = postulaciones;
          this.postulacionesTemp = postulaciones;
          this.cargando = false;
        });
  }

  busqueda(valor: string): any {
    if (valor.length === 0) {
      return this.postulaciones =  this.postulacionesTemp;
    }
    this.postulacionService.busquedaAceptadosSolicitante(valor, this.loginService.solicitante.id).subscribe(
      ({postulaciones}) => {
        this.postulaciones = postulaciones;
      }
    );
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

  confirmar(id_postulacion: number): void {
    Swal.fire({
      title: 'Desea confirmar su postulación?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.confirmar(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
          this.cargando = false;
          Swal.fire('Error al confirmar postulación', err.error.error || err.error.mensaje, 'error');
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
      title: 'Desea rechazar su postulación?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.rechazarPostulacionSolicitante(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
          this.cargando = false;
          Swal.fire('Error al confirmar postulación', err.error.error || err.error.mensaje, 'error');
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
    this.cargarPostulaciones();
  }
  cancelarModal(e) {
    this.myModal = e;
  }
}

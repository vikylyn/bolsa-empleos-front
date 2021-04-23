import { Component, OnInit } from '@angular/core';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulaciones-rechazadas-solicitante',
  templateUrl: './postulaciones-rechazadas-solicitante.component.html',
  styles: [
  ]
})
export class PostulacionesRechazadasSolicitanteComponent implements OnInit {
  myModal = false;
  idVacante: number;
  desde = 0;
  totalPostulaciones = 0;
  postulaciones: Postulacion [];
  postulacionesTemp: Postulacion [];
  cargando = true;
  constructor(private postulacionService: PostulacionService,
              private loginService: LoginService) {
                this.cargarPostulaciones();
              }

  ngOnInit(): void {
  }
  cargarPostulaciones(): void {
    this.cargando = true;
    this.postulacionService.listarRechazadasPorIdSolicitante(this.loginService.solicitante.id, this.desde)
        .subscribe(({total, postulaciones}) => {
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
    this.postulacionService.busquedaRechazadosSolicitante(valor, this.loginService.solicitante.id).subscribe(
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

  // eliminar la postulacion que no ha sido aceptada por el empleador
  eliminar(id_postulacion: number): void {

    Swal.fire({
      title: 'Estas seguro de eliminar la postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.eliminarRechazadoSolicitante(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
          this.cargando = false;
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

import { Component, OnInit } from '@angular/core';
import { Postulacion } from '../../../models/empleador/postulacion.model';
import { LoginService } from '../../../services/login.service';
import { Vacante } from '../../../models/empleador/vacante.model';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../../services/vacante/postulacion.service';
import { VacanteService } from '../../../services/vacante/vacante.service';

@Component({
  selector: 'app-postulacion-empleador',
  templateUrl: './postulacion-empleador.component.html',
  styles: [
  ]
})
export class PostulacionEmpleadorComponent implements OnInit {
  myModal = false;
  idSolicitante: number;
  idPostulacion: number;
  desde = 0;
  totalPostulaciones = 0;
  postulaciones: Postulacion [];
  postulacionesTemp: Postulacion [];
  cargando = true;
  vacantes: Vacante[];
  idVacante: number;
  constructor(
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private vacanteService: VacanteService) {
                  this.cargarVacantes();
              }

  ngOnInit(): void {
  }
  cargarPostulaciones(): void {
    this.cargando = true;
    this.postulacionService.listarPorIdVacante(this.idVacante, this.desde)
        .subscribe(({total, postulaciones}) => {
          this.totalPostulaciones = total;
          this.postulaciones = postulaciones;
          this.postulacionesTemp = postulaciones;
          this.cargando = false;
        });
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listarHabilitadas(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.idVacante = this.vacantes[0].id;
      this.cargando = false;
      this.cargarPostulaciones();
    });
  }
  filtrar(): void {
    this.cargarPostulaciones();
  }
  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.postulaciones =  this.postulacionesTemp;
    }
    this.postulacionService.busqueda(nombre, this.loginService.empleador.id).subscribe(
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
  rechazar(idPostulacion: number): void {

    Swal.fire({
      title: 'Estas seguro de eliminar la postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.rechazar(idPostulacion).subscribe((resp: any) => {
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

  aceptar(idPostulacion: number): void {
    Swal.fire({
      title: 'Desea contratar al solicitante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
         if (result.value) {
          this.postulacionService.aceptar(idPostulacion)
             .subscribe((resp: any) => {
               Swal.fire(resp.mensaje, '', 'success');
               this.cargarPostulaciones();
             }, (err) => {
               Swal.fire('Error al aceptar solicitante', err.error.mensaje, 'error');
               console.log(err);
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
  asignarFavorito(idPostulacion: number): void {
      this.postulacionService.asignarFavorito(idPostulacion)
         .subscribe((resp: any) => {
           Swal.fire(resp.mensaje, '', 'success');
           this.cargarPostulaciones();
         }, (err) => {
           Swal.fire('Error al asignar a favoritos', err.error.mensaje, 'error');
           console.log(err);
         });
  }
  quitarFavorito(idPostulacion: number): void {
    this.postulacionService.quitarFavorito(idPostulacion)
       .subscribe((resp: any) => {
         Swal.fire(resp.mensaje, '', 'success');
         this.cargarPostulaciones();
       }, (err) => {
         Swal.fire('Error al quitar de favoritos', err.error.mensaje, 'error');
         console.log(err);
       });
  }
  mostrarModal(idSolicitante: number, idPostulacion: number) {
    this.idPostulacion = idPostulacion;
    this.idSolicitante = idSolicitante;
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

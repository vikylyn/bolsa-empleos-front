import { Component, OnInit } from '@angular/core';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { LoginService } from '../../../../services/login.service';
import { Vacante } from '../../../../models/empleador/vacante.model';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { VacanteService } from '../../../../services/vacante/vacante.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-postulacion-empleador',
  templateUrl: './postulacion-consideradas-empleador.component.html',
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
  cargarMensaje = false;
  actualizacionSubscription: Subscription;

  constructor(
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private vacanteService: VacanteService) {
                  this.cargarVacantes();
              }

  ngOnInit(): void {
    this.actualizacionSubscription =  this.postulacionService.actualizarPostulaciones()
        .subscribe(( (id: number) => {
          const existe = this.postulaciones.find( elemento => elemento.id === id);
          if(existe) {
            this.cargarPostulaciones();
          }
        }));
  }
  cargarPostulaciones(): void {
    this.cargando = true;
    this.postulacionService.listarConsideradosPorIdVacante(this.idVacante, this.desde)
        .subscribe(({total, postulaciones}) => {
          this.totalPostulaciones = total;
          this.postulaciones = postulaciones;
          this.postulacionesTemp = postulaciones;
          this.cargando = false;
        });
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listarHabilitadasSinPaginacion(this.loginService.empleador.id)
    .subscribe(({vacantes}) => {
      this.vacantes = vacantes;
      if (this.vacantes.length === 0) {
        this.cargarMensaje = true;
      }else {
        this.idVacante = this.vacantes[0].id;
        this.cargarPostulaciones();
      }
      this.cargando = false;
    }, (err) => {
      console.log(err);
      this.cargando = false;
    });
  }
  filtrar(): void {
    this.cargarPostulaciones();
  }
  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.postulaciones =  this.postulacionesTemp;
    }
    this.postulacionService.busquedaConsideradosEmpleador(nombre, this.loginService.empleador.id).subscribe(
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

  // rechazar la postulacion que ha sido aceptada por el empleador
  rechazar(idPostulacion: number): void {

    Swal.fire({
      title: 'Estas seguro de rechazar la postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.rechazarAceptado(idPostulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar postulacion', err.error.error || err.error.mensaje, 'error');
          this.cargando = false;
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
          this.cargando = true;
          this.postulacionService.aceptar(idPostulacion)
             .subscribe((resp: any) => {
               Swal.fire(resp.mensaje, '', 'success');
               this.cargarPostulaciones();
             }, (err) => {
               Swal.fire('Error al aceptar solicitante', err.error.mensaje, 'error');
               console.log(err);
               this.cargando = false;
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
      this.cargando = true;
      this.postulacionService.asignarFavorito(idPostulacion)
         .subscribe((resp: any) => {
           this.cargarPostulaciones();
           this.cargando = false;
           Swal.fire(resp.mensaje, '', 'success');
         }, (err) => {
           Swal.fire('Error al asignar a favoritos', err.error.mensaje, 'error');
           console.log(err);
           this.cargando = false;
         });
  }
  quitarFavorito(idPostulacion: number): void {
    this.cargando = true;
    this.postulacionService.quitarFavorito(idPostulacion)
       .subscribe((resp: any) => {
         Swal.fire(resp.mensaje, '', 'success');
         this.cargarPostulaciones();
         this.cargando = false;
       }, (err) => {
         Swal.fire('Error al quitar de favoritos', err.error.mensaje, 'error');
         console.log(err);
         this.cargando = false;
       });
  }
  mostrarModal(idSolicitante: number, idPostulacion: number) {
    console.log(idSolicitante, idPostulacion);
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

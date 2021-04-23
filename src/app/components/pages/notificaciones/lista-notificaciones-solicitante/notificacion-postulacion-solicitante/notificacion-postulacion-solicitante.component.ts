import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Notificacion } from '../../../../../models/notificacion';
import { EmpresaService } from '../../../../../services/empleador/empresa.service';
import { NotificacionService } from '../../../../../services/notificacion/notificacion.service';
import { PostulacionService } from '../../../../../services/vacante/postulacion.service';
import { LoginService } from '../../../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratacionService } from '../../../../../services/vacante/contratacion.service';
import { Postulacion } from '../../../../../models/empleador/postulacion.model';
import { Contratacion } from '../../../../../models/empleador/contratacion.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notificacion-postulacion-solicitante',
  templateUrl: './notificacion-postulacion-solicitante.component.html',
  styles: [
  ]
})
export class NotificacionPostulacionSolicitanteComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idNotificacion: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();

  notificacion: Notificacion;
  postulacion: Postulacion;
  contratacion: Contratacion;
  ocupado = false;
  verificacionSubscription: Subscription;
  postulando = false;
  cargando = true;
  cargando2 = false;
  notificacionEliminada = false;
  constructor(
              private notificacionService: NotificacionService,
              private postulacionService: PostulacionService,
              private loginService: LoginService) {
              }

  ngOnInit(): void {
    this.cargando = true;
    this.notificacionService.buscar(this.idNotificacion,
      this.loginService.solicitante.credenciales.rol.id).subscribe((resp: Notificacion) => {
            console.log(resp);
            this.notificacion = resp;
            this.verificarPostulacion();
            this.cargando = false;
    }, (err) => {
      Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
      console.log(err);
      this.notificacionEliminada = true;
      this.cargando = false;
          //  this.router.navigateByUrl('/postulaciones-solicitante');
    });
    this.veririficarPostulacionWs();
  }
  veririficarPostulacionWs(): void {
    this.verificacionSubscription =  this.postulacionService.verificarPostulacion()
        .subscribe(( () => {
          this.verificarPostulacion();
        }));
  }
  // verificar si el solicitante ya se postulo a la vacante
  verificarPostulacion(): void {
    this.postulacionService.buscarPorIdSolicitanteVacante(this.loginService.solicitante.id, this.notificacion.vacante.id)
        .subscribe((resp: any) => {
          console.log(resp);
          this.cargando = false;
          this.ocupado = resp.ocupado;
          this.postulacion = resp.postulacion;
          this.contratacion = resp.contratacion;
        });
  }

  postular(): void {
    const datos = {
                    id_solicitante: this.loginService.solicitante.id,
                    id_vacante: this.notificacion.vacante.id,
                    id_empleador: this.notificacion.vacante.empleador.id
                  };
    console.log(datos);
    Swal.fire({
      title: 'Desea de postular a la vacante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando2 = true;
        this.postulacionService.postular(datos).subscribe( (resp: any ) => {
          this.postulacion = resp.postulacion;
          this.postulando = true;
          this.cargando2 = false;
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          this.cargando2 = false;
          Swal.fire('Error al postularme', err.error.error || err.error.mensaje, 'error');
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
  // eliminar la postulacion que no ha sido aceptada por el empleador
  cancelar(): void {

    Swal.fire({
      title: 'Estas seguro de cancelar su postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando2 = true;
        this.postulacionService.eliminar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando2 = false;
          this.verificarPostulacion();
        }, (err) => {
          console.log(err);
          this.cargando2 = false;
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

  confirmar(): void {
    Swal.fire({
      title: 'Desea confirmar su postulacion?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando2 = true;
        this.postulacionService.confirmar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando2 = false;
          this.verificarPostulacion();
        }, (err) => {
          console.log(err);
          this.cargando2 = false;
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

  rechazar(): void {
    Swal.fire({
      title: 'Desea rechazar su postulacion?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando2 = true;
        this.postulacionService.rechazarPostulacionSolicitante(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando2 = false;
          this.verificarPostulacion();
        }, (err) => {
          console.log(err);
          this.cargando2 = false;
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
  ngOnDestroy(): void {
    this.verificacionSubscription.unsubscribe();
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

}

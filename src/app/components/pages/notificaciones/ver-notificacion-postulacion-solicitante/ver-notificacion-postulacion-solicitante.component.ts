import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { LoginService } from '../../../../services/login.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NotificacionService } from '../../../../services/notificacion/notificacion.service';
import { Notificacion } from '../../../../models/notificacion';
import Swal from 'sweetalert2';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { Contratacion } from '../../../../models/empleador/contratacion.model';

@Component({
  selector: 'app-ver-notificacion-postulacion-solicitante',
  templateUrl: './ver-notificacion-postulacion-solicitante.component.html',
  styles: [
  ]
})
export class VerNotificacionPostulacionSolicitanteComponent implements OnInit {
  notificacion: Notificacion;
  postulacion: Postulacion;
  contratacion: Contratacion;
  ocupado = false;
  verificacionSubscription: Subscription;
  postulando = false;
  cargando = true;
  notificacionEliminada = false;
  constructor(
              private notificacionService: NotificacionService,
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private activatedRoute: ActivatedRoute) {
              }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.cargando = true;
        this.notificacionEliminada = false;
        this.buscarNotificacion(params.id);
      }
    );
    this.veririficarPostulacionWs();
  }
  buscarNotificacion(id: number): void {
    this.notificacionService.buscar(id,
      this.loginService.solicitante.credenciales.rol.id).subscribe((resp: Notificacion) => {
        this.notificacion = resp;
        this.verificarPostulacion();
      }, (err) => {
        Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
        console.log(err);
        this.notificacionEliminada = true;
        this.cargando = false;
      //  this.router.navigateByUrl('/postulaciones-solicitante');
      });
  }
  veririficarPostulacionWs(): void {
    this.verificacionSubscription =  this.postulacionService.verificarPostulacion()
        .subscribe(( () => {
          this.verificarPostulacion();
          this.buscarNotificacion(this.notificacion.id);
        }));
  }
  // verificar si el solicitante ya se postulo a la vacante
  verificarPostulacion(): void {
    this.postulacionService.buscarPorIdSolicitanteVacante(this.loginService.solicitante.id, this.notificacion.vacante.id)
        .subscribe((resp: any) => {
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
      title: '¿Desea de postular a la vacante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.postular(datos).subscribe( (resp: any ) => {
          this.postulacion = resp.postulacion;
          this.postulando = true;
          this.cargando = false;
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          this.cargando = false;
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
      title: '¿Estás seguro de cancelar su postulación?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.eliminar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.verificarPostulacion();
          this.cargando = false;
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

  confirmar(): void {
    Swal.fire({
      title: '¿Desea confirmar su postulación?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.confirmar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.verificarPostulacion();
          this.cargando = false;
        }, (err) => {
          console.log(err);
          this.cargando = false;
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
      title: '¿Desea rechazar su postulación?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.postulacionService.rechazarPostulacionSolicitante(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.verificarPostulacion();
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
  ngOnDestroy(): void {
    this.verificacionSubscription.unsubscribe();
  }

}

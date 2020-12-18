import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { LoginService } from '../../../services/login.service';
import { Notificacion } from '../../../models/notificacion';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: [
  ]
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notificaciones: Notificacion[];
  notificacionesSubscription: Subscription;
  constructor(public notificacionService: NotificacionService,
              private router: Router,
              public loginService: LoginService) {
    this.cargarNotificaciones();
  }


  cargarNotificaciones(): void {
    this.notificacionService.listar(this.loginService.solicitante.id, this.loginService.solicitante.credenciales.rol.id)
    .subscribe((resp: Notificacion[]) => {
      this.notificaciones = resp;
    });
  }
  ngOnInit(): void {
     this.notificacionesSubscription =  this.notificacionService.recibirNotificacionesNuevas()
        .subscribe(( () => {
          this.cargarNotificaciones();
        }));
  }

  leerNotificacion(idNotificacion: number, leido: boolean, tipoNotificacion: string ): void {
    // hay que cambiar para que acepte a ambos usuario solicitante y empleador
    if (!leido) {
      this.notificacionService.leerNotificacion(idNotificacion, this.loginService.solicitante.credenciales.rol.id)
      .subscribe((resp: any) => {
        this.redireccionar(tipoNotificacion, idNotificacion);
        this.cargarNotificaciones();
      });
    }else {
      this.redireccionar(tipoNotificacion, idNotificacion);
    }

  }

  redireccionar(tipoNotificacion: string, idNotificacion: number): void {
    if (tipoNotificacion === 'postulacion_aceptada' || tipoNotificacion === 'postulacion_rechazada_empleador' || tipoNotificacion === 'invitacion_postulacion') {
      this.router.navigateByUrl(`/postulaciones-solicitante/notificacion/${idNotificacion}`);

    }else  if (tipoNotificacion === 'desvinculacion_solicitante') {
      this.router.navigateByUrl(`/contrataciones-solicitante/notificacion/${idNotificacion}`);
    }
  }

  ngOnDestroy(): void {
    this.notificacionesSubscription.unsubscribe();
  }

  eliminar(idNotificacion: number): void {
    Swal.fire({
      title: 'Desea eliminar esta notificacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.notificacionService.eliminar(idNotificacion, this.loginService.solicitante.credenciales.rol.id).subscribe( (resp: any ) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.notificaciones = this.notificaciones.filter( (notificacion: Notificacion) => notificacion.id !== idNotificacion);
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar notificacion', err.error.error || err.error.mensaje, 'error');
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

}

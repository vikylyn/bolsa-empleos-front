import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { LoginService } from '../../../services/login.service';
import { Notificacion } from '../../../models/notificacion';
import { Router, RouterLink } from '@angular/router';

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
    if (this.loginService.empleador) {
      this.notificacionService.listarNoleidas(this.loginService.empleador.id, this.loginService.empleador.credenciales.rol.id)
      .subscribe((resp: Notificacion[]) => {
        console.log(resp);
        this.notificaciones = resp;
      });
    } else if (this.loginService.solicitante) {
      this.notificacionService.listarNoleidas(this.loginService.solicitante.id, this.loginService.solicitante.credenciales.rol.id)
      .subscribe((resp: Notificacion[]) => {
        console.log(resp);
        this.notificaciones = resp;
      });
    }
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
      this.notificacionService.leerNotificacion(idNotificacion, this.loginService.empleador.credenciales.rol.id)
      .subscribe((resp: any) => {
        this.redireccionar(tipoNotificacion);
        this.cargarNotificaciones();
      });
    }else {
      this.redireccionar(tipoNotificacion);
    }

  }

  redireccionar(tipoNotificacion: string): void {
    if (tipoNotificacion === 'nueva_postulacion' || tipoNotificacion === 'postulacion_rechazada_solicitante') {
      this.router.navigateByUrl(`/postulaciones-empleador`);
    }else   if (tipoNotificacion === 'postulacion_confirmada') {
      this.router.navigateByUrl(`/contrataciones-empleador`);
    }else  if (tipoNotificacion === '') {

    }else  if (tipoNotificacion === '') {

    }
  }

  ngOnDestroy(): void {
    this.notificacionesSubscription.unsubscribe();
  }


}

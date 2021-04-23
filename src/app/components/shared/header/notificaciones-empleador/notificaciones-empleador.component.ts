import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificacionService } from '../../../../services/notificacion/notificacion.service';
import { LoginService } from '../../../../services/login.service';
import { Notificacion } from '../../../../models/notificacion';
import { Router} from '@angular/router';
@Component({
  selector: 'app-notificaciones-empleador',
  templateUrl: './notificaciones-empleador.component.html',
  styles: [
  ]
})
export class NotificacionesEmpleadorComponent implements OnInit, OnDestroy {

  notificaciones: Notificacion[];
  notificacionesSubscription: Subscription;
  constructor(public notificacionService: NotificacionService,
              private router: Router,
              public loginService: LoginService) {
    this.cargarNotificaciones();
  }


  cargarNotificaciones(): void {
      this.notificacionService.listar(this.loginService.empleador.id, this.loginService.empleador.credenciales.rol.id)
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
    if (!leido) {
      this.notificacionService.leerNotificacion(idNotificacion, this.loginService.empleador.credenciales.rol.id)
      .subscribe((resp: any) => {
        this.router.navigateByUrl(`/notificaciones-empleador/${idNotificacion}`);
        this.cargarNotificaciones();
      });
    }else {
      this.router.navigateByUrl(`/notificaciones-empleador/${idNotificacion}`);
    }
  }
  ngOnDestroy(): void {
    this.notificacionesSubscription.unsubscribe();
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Imagen } from '../../models/imagen.model';
import { ImagenService } from '../../services/imagen.service';
import { Empleador } from '../../models/empleador/empleador.model';
import { Solicitante } from '../../models/solicitante/solicitante.model';
import { Administrador } from '../../models/administrador/administrador.model';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { Subscription } from 'rxjs';
import { InformacionAppService } from '../../services/informacion-app.service';
import { InformacionApp } from '../../models/informacion-app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  implements OnInit, OnDestroy {
  empleador: Empleador;
  solicitante: Solicitante;
  administrador: Administrador;
  totalNotificaciones = 0;
  notificacionesSubscription: Subscription;
  actualizacionUsuarioSubscription: Subscription;
  actualizacionInfoAppSubscription: Subscription;
  informacion: InformacionApp;

  constructor(public loginService: LoginService,
              public wsService: WebsocketService,
              private infoService: InformacionAppService,
              public notificacionService: NotificacionService
             ) {
  }
  ngOnInit(): void {
   this.recibirTotalNotificaciones();
   this.cargarUsuario();
   this.actualizarUsuarioWs();
   this.actualizarInfoAppWs();
   this.cargarInformacionApp();
  }
  cargarInformacionApp(): void {
    this.infoService.buscar(1).subscribe((resp: InformacionApp) => {
      this.informacion = resp;
    });
  }
  cargarUsuario(): void {
    if (this.loginService.solicitante != null) {
      this.solicitante = this.loginService.solicitante;
      this.contarNotificaciones(this.solicitante.id, this.solicitante.credenciales.rol.id);
    } else  if (this.loginService.administrador != null) {
      this.administrador = this.loginService.administrador;
      this.contarNotificaciones(this.administrador.id, this.administrador.credenciales.rol.id);
    } else  if (this.loginService.empleador != null) {
      this.empleador = this.loginService.empleador;
      this.contarNotificaciones(this.empleador.id, this.empleador.credenciales.rol.id);
    }
  }
  ngOnDestroy(): void {
    this.notificacionesSubscription.unsubscribe();
    this.actualizacionUsuarioSubscription.unsubscribe();

  }
  recibirTotalNotificaciones() {
    this.notificacionesSubscription =  this.notificacionService.recibirTotalNoLeidas()
        .subscribe(((msg: number) => {
          this.totalNotificaciones = msg;
        }));
  }
  actualizarUsuarioWs() {
    this.actualizacionUsuarioSubscription = this.notificacionService.actualizarUsuario()
        .subscribe(() => {
          this.cargarUsuario();
        });
  }
  actualizarInfoAppWs() {
    this.actualizacionInfoAppSubscription = this.notificacionService.actualizarInformacionApp()
        .subscribe(() => {
          this.cargarInformacionApp();
        });
  }

  contarNotificaciones(id_usuario: number, id_rol: number) {
    this.notificacionService.contarNoleidas(id_usuario, id_rol)
        .subscribe((resp: number) => {
          console.log('no leidas: ', resp);
          this.totalNotificaciones = resp;
        });
  }

  logout(): any {
    this.loginService.logout();
    this.wsService.logoutWS();

  }


}

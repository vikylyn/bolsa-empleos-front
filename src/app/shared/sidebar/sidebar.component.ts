import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { Rol } from '../../models/rol.model';
import { LoginService } from '../../services/login.service';
import { Imagen } from '../../models/imagen.model';
import { ImagenService } from '../../services/imagen.service';
import { Empleador } from '../../models/empleador/empleador.model';
import { Solicitante } from '../../models/solicitante/solicitante.model';
import { Administrador } from '../../models/administrador/administrador.model';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { Subscription } from 'rxjs';
import { Empresa } from '../../models/empleador/empresa.model';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  empleador: Empleador;
  empresa: Empresa;
  solicitante: Solicitante;
  administrador: Administrador;
  actualizacionUsuarioSubscription: Subscription;

  constructor(public sidebar: SidebarService,
              private loginService: LoginService,
              public notificacionService: NotificacionService) {
  }
  ngOnInit(): void {
    this.cargarUsuario();
    this.actualizarUsuario();
  }
  cargarUsuario(): void {
    if (this.loginService.solicitante != null) {
      this.solicitante = this.loginService.solicitante;
    }
    if (this.loginService.administrador != null) {
      this.administrador = this.loginService.administrador;

    }
    if (this.loginService.empleador != null) {
      this.empleador = this.loginService.empleador;
      this.empresa = this.loginService.empresa;
    }
    if (this.loginService.empresa != null) {
      this.empresa = this.loginService.empresa;
    }
  }
  logout(): void {
    this.loginService.logout();
  }
  ngOnDestroy(): void {
    this.actualizacionUsuarioSubscription.unsubscribe();

  }
  actualizarUsuario(): any {
    this.actualizacionUsuarioSubscription = this.notificacionService.actualizarUsuario()
        .subscribe(() => {
          this.cargarUsuario();
        });
  }


}

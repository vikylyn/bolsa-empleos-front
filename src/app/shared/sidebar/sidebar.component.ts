import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { Rol } from '../../models/rol.model';
import { LoginService } from '../../services/login.service';
import { Imagen } from '../../models/imagen.model';
import { ImagenService } from '../../services/imagen.service';
import { Empleador } from '../../models/empleador/empleador.model';
import { Solicitante } from '../../models/solicitante/solicitante.model';
import { Administrador } from '../../models/administrador/administrador.model';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  empleador: Empleador;
  solicitante: Solicitante;
  administrador: Administrador;
  constructor(public sidebar: SidebarService,
              private loginService: LoginService) {
  }
  
  ngOnInit(): void {
    this.empleador = this.loginService.empleador;
    if (this.loginService.solicitante != null) {
      this.solicitante = this.loginService.solicitante;
      console.log(this.solicitante);
    }
    if (this.loginService.administrador != null) {
      this.administrador = this.loginService.administrador;
      console.log(this.administrador);

    }
    if (this.loginService.empleador != null) {
      this.empleador = this.loginService.empleador;
      console.log(this.empleador);
    }
  }
  logout(): void {
    this.loginService.logout();
  }


}

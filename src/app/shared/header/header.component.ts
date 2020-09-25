import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Imagen } from '../../models/imagen.model';
import { ImagenService } from '../../services/imagen.service';
import { Empleador } from '../../models/empleador/empleador.model';
import { Solicitante } from '../../models/solicitante/solicitante.model';
import { Administrador } from '../../models/administrador/administrador.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  implements OnInit {
  empleador: Empleador;
  solicitante: Solicitante;
  administrador: Administrador;
  constructor(public loginService: LoginService,
             ) {
  }
  ngOnInit(): void {
   if (this.loginService.solicitante != null) {
     this.solicitante = this.loginService.solicitante;
   }
   if (this.loginService.administrador != null) {
     this.administrador = this.loginService.administrador;
   }
   if (this.loginService.empleador != null) {
     this.empleador = this.loginService.empleador;
   }
  }

  logout(): any {
    this.loginService.logout();
  }


}

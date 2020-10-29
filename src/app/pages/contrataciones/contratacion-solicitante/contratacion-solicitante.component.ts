import { Component, OnInit } from '@angular/core';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import { LoginService } from '../../../services/login.service';
import { Contratacion } from '../../../models/empleador/contratacion.model';

@Component({
  selector: 'app-contratacion-solicitante',
  templateUrl: './contratacion-solicitante.component.html',
  styles: [
  ]
})
export class ContratacionSolicitanteComponent implements OnInit {
  desde = 0;
  totalContrataciones = 0;
  contrataciones: Contratacion [];
  contratacionesTemp: Contratacion [];
  cargando = true;
  constructor(private contratacionService: ContratacionService,
              private loginService: LoginService) {
                this.cargarContrataciones();
              }

  ngOnInit(): void {
  }

  cargarContrataciones(): void {
    this.cargando = true;
    this.contratacionService.listarPorIdSolicitante(this.loginService.solicitante.id, this.desde)
        .subscribe(({total, contrataciones}) => {
          this.contrataciones = contrataciones;
          this.totalContrataciones = total;
          this.cargando = false;
        });
  }
  busqueda(nombre: string): any {
    /*   if (nombre.length === 0) {
         return this.administradores =  this.adminTemp;
       }
       this.administradorService.busqueda(nombre).subscribe(
         (resp: Administrador[]) => {
           this.administradores = resp;
         }
       );
       */
     }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalContrataciones) {
      this.desde -= valor;
    }
    this.cargarContrataciones();
  }
}

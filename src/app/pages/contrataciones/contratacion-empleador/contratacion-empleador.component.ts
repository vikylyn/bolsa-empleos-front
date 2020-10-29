import { Component, OnInit } from '@angular/core';
import { Contratacion } from '../../../models/empleador/contratacion.model';
import { Vacante } from 'src/app/models/empleador/vacante.model';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import { LoginService } from '../../../services/login.service';
import { VacanteService } from '../../../services/vacante/vacante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratacion-empleador',
  templateUrl: './contratacion-empleador.component.html',
  styles: [
  ]
})
export class ContratacionEmpleadorComponent implements OnInit {
  desde = 0;
  totalContrataciones = 0;
  contrataciones: Contratacion [];
  contratacionesTemp: Contratacion [];
  cargando = true;
  vacantes: Vacante[];
  id_vacante: number;
  constructor(private contratacionService: ContratacionService,
              private loginService: LoginService,
              private vacanteService: VacanteService) {
          //      this.cargarPostulaciones();
                  this.cargarVacantes();
              }

  ngOnInit(): void {
  }
  cargarContrataciones(): void {
    this.cargando = true;
    this.contratacionService.listarPorIdVacante(this.id_vacante, this.desde)
        .subscribe(({total, contrataciones}) => {
          console.log('contrataciones', contrataciones);
          this.totalContrataciones = total;
          this.contrataciones = contrataciones;
          this.cargando = false;
        });
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listar(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.id_vacante = this.vacantes[0].id;
      this.cargando = false;
      this.cargarContrataciones();
    });
  }
  filtrar(): void {
    this.cargarContrataciones();
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

  // eliminar la postulacion que no ha sido aceptada por el empleador
  terminar(id_postulacion: number): void {

    Swal.fire({
      title: 'Estas seguro de eliminar su postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
   /*     this.contratacionService.eliminar(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarContrataciones();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar postulacion', err.error.error || err.error.mensaje, 'error');
        });
      */      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }

}

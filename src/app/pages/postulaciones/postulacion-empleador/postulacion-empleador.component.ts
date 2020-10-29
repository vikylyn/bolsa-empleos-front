import { Component, OnInit } from '@angular/core';
import { Postulacion } from '../../../models/empleador/postulacion.model';
import { LoginService } from '../../../services/login.service';
import { Vacante } from '../../../models/empleador/vacante.model';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../../services/vacante/postulacion.service';
import { VacanteService } from '../../../services/vacante/vacante.service';
import { ContratacionService } from '../../../services/vacante/contratacion.service';

@Component({
  selector: 'app-postulacion-empleador',
  templateUrl: './postulacion-empleador.component.html',
  styles: [
  ]
})
export class PostulacionEmpleadorComponent implements OnInit {

  desde = 0;
  totalPostulaciones = 0;
  postulaciones: Postulacion [];
  postulacionesTemp: Postulacion [];
  cargando = true;
  vacantes: Vacante[];
  id_vacante: number;
  constructor(
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private contratacionService: ContratacionService,
              private vacanteService: VacanteService) {
          //      this.cargarPostulaciones();
                  this.cargarVacantes();
              }

  ngOnInit(): void {
  }
  cargarPostulaciones(): void {
    this.cargando = true;
    this.postulacionService.listarPorIdVacante(this.id_vacante, this.desde)
        .subscribe(({total, postulaciones}) => {
          this.totalPostulaciones = total;
          this.postulaciones = postulaciones;
          this.cargando = false;
        });
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listar(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.id_vacante = this.vacantes[0].id;
      console.log(this.id_vacante);
      this.cargando = false;
      this.cargarPostulaciones();
    });
  }
  filtrar(): void {
    this.cargarPostulaciones();
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
    else if (this.desde >= this.totalPostulaciones) {
      this.desde -= valor;
    }
    this.cargarPostulaciones();
  }

  // eliminar la postulacion que no ha sido aceptada por el empleador
  eliminar(id_postulacion: number): void {

    Swal.fire({
      title: 'Estas seguro de eliminar su postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.eliminar(id_postulacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarPostulaciones();
        }, (err) => {
          console.log(err);
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

  contratar(id_postulacion: number): void {
    Swal.fire({
      title: 'Desea contratar al solicitante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
         if (result.value) {
          this.contratacionService.contratar(id_postulacion)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargarPostulaciones();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al contratar solicitante', err.error.error.error || err.error.error || err.error.mensaje, 'error');
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

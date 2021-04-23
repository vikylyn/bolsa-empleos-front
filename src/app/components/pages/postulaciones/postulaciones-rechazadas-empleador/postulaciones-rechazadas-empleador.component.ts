import { Component, OnInit } from '@angular/core';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { Vacante } from '../../../../models/empleador/vacante.model';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { LoginService } from '../../../../services/login.service';
import { VacanteService } from '../../../../services/vacante/vacante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulaciones-rechazadas-empleador',
  templateUrl: './postulaciones-rechazadas-empleador.component.html',
  styles: [
  ]
})
export class PostulacionesRechazadasEmpleadorComponent implements OnInit {
  myModal = false;
  idSolicitante: number;
  idPostulacion: number;
  desde = 0;
  totalPostulaciones = 0;
  postulaciones: Postulacion [];
  postulacionesTemp: Postulacion [];
  cargando = true;
  vacantes: Vacante[];
  idVacante: number;
  cargarMensaje = false;

  constructor(
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private vacanteService: VacanteService) {
                  this.cargarVacantes();
              }

  ngOnInit(): void {
  }
  cargarPostulaciones(): void {
    this.cargando = true;
    this.postulacionService.listarRechazadasPorIdVacante(this.idVacante, this.desde)
        .subscribe(({total, postulaciones}) => {
          this.totalPostulaciones = total;
          this.postulaciones = postulaciones;
          this.postulacionesTemp = postulaciones;
          this.cargando = false;
        });
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listarHabilitadasSinPaginacion(this.loginService.empleador.id)
    .subscribe(({vacantes}) => {
      this.vacantes = vacantes;
      if (this.vacantes.length === 0) {
        this.cargarMensaje = true;
      }else {
        this.idVacante = this.vacantes[0].id;
        this.cargarPostulaciones();
      }
      this.cargando = false;
    }, (err) => {
      console.log(err);
      this.cargando = false;
    });
  }
  filtrar(): void {
    this.cargarPostulaciones();
  }
  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.postulaciones =  this.postulacionesTemp;
    }
    this.cargando = true;
    this.postulacionService.busquedaRechazadosEmpleador(nombre, this.loginService.empleador.id).subscribe(
      ({postulaciones}) => {
        this.postulaciones = postulaciones;
        this.cargando = false;
      }
    );
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

  aceptar(idPostulacion: number): void {
    Swal.fire({
      title: 'Estas seguro de contratar al solicitante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
         if (result.value) {
          this.cargando = true;
          this.postulacionService.aceptar(idPostulacion)
             .subscribe((resp: any) => {
               Swal.fire(resp.mensaje, '', 'success');
               this.cargarPostulaciones();
             }, (err) => {
               Swal.fire('Error al aceptar solicitante', err.error.mensaje, 'error');
               console.log(err);
               this.cargando = false;
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

  mostrarModal(idSolicitante: number, idPostulacion: number) {
    console.log(idSolicitante, idPostulacion);
    this.idPostulacion = idPostulacion;
    this.idSolicitante = idSolicitante;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarPostulaciones();
  }
  cancelarModal(e) {
    this.myModal = e;
  }
}

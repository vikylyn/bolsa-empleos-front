import { Component, OnInit } from '@angular/core';
import { Contratacion } from '../../../../models/empleador/contratacion.model';
import { ContratacionService } from '../../../../services/vacante/contratacion.service';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratacion-empleador',
  templateUrl: './contratacion-empleador.component.html',
  styles: [
  ]
})
export class ContratacionEmpleadorComponent implements OnInit {
  myModal = false;
  idSolicitante: number;
  idContratacion: number;
  desde = 0;
  totalContrataciones = 0;
  contrataciones: Contratacion [];
  contratacionesTemp: Contratacion [];
  cargando = true;
  // vacantes: Vacante[];
  // id_vacante: number;
  constructor(private contratacionService: ContratacionService,
              private loginService: LoginService) {
                this.cargarContrataciones();
          //        this.cargarVacantes();
              }

  ngOnInit(): void {
  }
  cargarContrataciones(): void {
    this.cargando = true;
    this.contratacionService.listarPorIdEmpleador(this.loginService.empleador.id, this.desde)
    .subscribe(({total, contrataciones}) => {
      this.totalContrataciones = total;
      this.contrataciones = contrataciones;
      this.contratacionesTemp = contrataciones;
      this.cargando = false;
    });
/*    this.contratacionService.listarPorIdVacante(this.id_vacante, this.desde)
        .subscribe(({total, contrataciones}) => {
          console.log('contrataciones', contrataciones);
          this.totalContrataciones = total;
          this.contrataciones = contrataciones;
          this.cargando = false;
        });
*/
  }

 /* cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listarTodas(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;

      this.id_vacante = this.vacantes[0].id;
      this.cargando = false;
      this.cargarContrataciones();
    });
  }
*/
  filtrar(): void {
    this.cargarContrataciones();
  }
  busqueda(valor: string): any {
    if (valor.length === 0) {
      return this.contrataciones =  this.contratacionesTemp;
    }
    this.cargando = true;
    this.contratacionService.busquedaEmpleador(valor, this.loginService.empleador.id).subscribe(
      ({contrataciones}) => {
        this.contrataciones = contrataciones;
        this.cargando = false;
      }
    );
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
  terminar(id_contratacion: number): void {

    Swal.fire({
      title: 'Estas seguro de terminar el contrato?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.contratacionService.desvincularSolicitante(id_contratacion).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarContrataciones();
          this.cargando = false;
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar postulacion', err.error.error || err.error.mensaje, 'error');
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

  mostrarModal(idSolicitante: number, idContratacion: number) {
    this.idContratacion = idContratacion;
    this.idSolicitante = idSolicitante;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarContrataciones();
  }
  cancelarModal(e) {
    this.myModal = e;
  }
}

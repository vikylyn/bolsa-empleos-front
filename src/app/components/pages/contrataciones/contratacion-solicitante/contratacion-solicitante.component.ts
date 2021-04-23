import { Component, OnInit } from '@angular/core';
import { ContratacionService } from '../../../../services/vacante/contratacion.service';
import { LoginService } from '../../../../services/login.service';
import { Contratacion } from '../../../../models/empleador/contratacion.model';
import Swal from 'sweetalert2';

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
  myModal = false;
  idVacante: number;
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
          this.contratacionesTemp = contrataciones;
          this.totalContrataciones = total;
          this.cargando = false;
        });
  }
  busqueda(valor: string): any {
    if (valor.length === 0) {
      return this.contrataciones =  this.contratacionesTemp;
    }
    this.contratacionService.busquedaSolicitante(valor, this.loginService.solicitante.id).subscribe(
      ({contrataciones}) => {
        this.contrataciones = contrataciones;
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

  eliminar(id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar la contratacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.contratacionService.ocultar(id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cargarContrataciones();
        }, (err) => {
          console.log(err);
          this.cargando = false;
          Swal.fire('Error al eliminar contratacion', err.error.error || err.error.mensaje, 'error');
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

  mostrarModal(idVacante: number) {
    console.log('id de la Vacantee',idVacante)
    this.idVacante = idVacante;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
  }
}

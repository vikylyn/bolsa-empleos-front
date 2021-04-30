import { Component, OnInit } from '@angular/core';
import { OcupacionSolicitanteService } from '../../../../services/solicitante/ocupacion-solicitante.service';
import { LoginService } from '../../../../services/login.service';
import { OcupacionSolicitante } from '../../../../models/ocupacion/ocupacion-solicitante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ocupacion-solicitante',
  templateUrl: './ocupacion-solicitante.component.html',
  styles: [
  ]
})
export class OcupacionSolicitanteComponent implements OnInit {
  desde = 0;
  ocupacionesSolicitante: OcupacionSolicitante[];
  total = 0;
  cargando = true;
  myModal = false;

  constructor(private ocupacionSolicitanteService: OcupacionSolicitanteService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarOcupaciones();
  }
  cargarOcupaciones(): void {
    this.cargando = true;
    this.ocupacionSolicitanteService.listar(this.loginService.solicitante.id, this.desde)
    .subscribe(({total, ocupaciones}) => {
      this.ocupacionesSolicitante = ocupaciones;
      this.total = total;
      this.cargando = false;
    });
  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.total) {
      this.desde -= valor;
    }
    this.cargarOcupaciones();
  }
  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar la ocupación?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.ocupacionSolicitanteService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargando = false;
          this.cargarOcupaciones();
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
  mostrarModal() {
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarOcupaciones();
  }

  cancelarModal(e) {
    this.myModal = e;
  }

}

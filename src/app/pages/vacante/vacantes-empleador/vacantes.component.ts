import { Component, OnInit } from '@angular/core';
import { Vacante } from '../../../models/empleador/vacante.model';
import { VacanteService } from '../../../services/vacante/vacante.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styles: [
  ]
})
export class VacantesComponent implements OnInit {
  myModal = false;
  myModal2 = false;
  idVacante: number;
  tipoOperacion: string;
  vacantes: Vacante[];
  vacantesTemp: Vacante[];

  desde = 0;
  cargando = true;
  totalVacantes = 0;
  valorSelect = 'todas';

  constructor(private vacanteService: VacanteService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarVacantes();
  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalVacantes) {
      this.desde -= valor;
    }
    this.filtrar();
  }
  // todas las vacantes
  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listarTodas(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.vacantesTemp = vacantes;
      this.totalVacantes = total;
      this.cargando = false;
    });
  }
  cargarVacantesHabilitadas(): void {
    this.cargando = true;
    this.vacanteService.listarHabilitadas(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.vacantesTemp = vacantes;
      this.totalVacantes = total;
      this.cargando = false;
    });
  }
  cargarVacantesInhabilitadas(): void {
    this.cargando = true;
    this.vacanteService.listarInhabilitadas(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.vacantesTemp = vacantes;
      this.totalVacantes = total;
      this.cargando = false;
    });
  }
  filtrar(): void {
      if (this.valorSelect === 'todas') {
      this.cargarVacantes();
    }else if (this.valorSelect === 'habilitadas') {
      this.cargarVacantesHabilitadas();
    } else if (this.valorSelect === 'inhabilitadas') {
      this.cargarVacantesInhabilitadas();
    }
  }
  busqueda(valor: string): any {
    if (valor.length === 0) {
      return this.vacantes =  this.vacantesTemp;
    }
    this.vacanteService.busqueda(valor, this.loginService.empleador.id).subscribe(
      ({vacantes}) => {
        this.vacantes = vacantes;
      }
    );
  }
  habilitar(id: number): void {
    Swal.fire({
      title: 'Estas seguro de habilitar la vacante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.vacanteService.habilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Habilitado!',
            resp.mensaje,
            'success'
          );
          this.cargarVacantes();
        },(err) => {
          console.log(err);
          Swal.fire('Error al habilitar Vacante', err.error.error || err.error.mensaje, 'error');
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
  inhabilitar(id: number): void {
    Swal.fire({
      title: 'Estas seguro de inhabilitar la vacante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.vacanteService.inhabilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'inhabilitado!',
            resp.mensaje,
            'success'
          );
          this.cargarVacantes();
        },(err) => {
          console.log(err);
          Swal.fire('Error al inhabilitar Vacante', err.error.error || err.error.mensaje, 'error');
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
  eliminar(idVacante: number): void {

      Swal.fire({
        title: 'Estas seguro de eliminar la vacante?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.vacanteService.eliminacion(idVacante).subscribe( (resp: any) => {
            Swal.fire(
              'Eliminado!',
              resp.mensaje,
              'success'
            );
            this.cargarVacantes();
          },(err) => {
            console.log(err);
            Swal.fire('Error al eliminar Vacante', err.error.error || err.error.mensaje, 'error');
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


  mostrarModal(tipoOperacion: string, idVacante: number) {
    this.tipoOperacion = tipoOperacion;
    this.idVacante = idVacante;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarVacantes();
  }

  cancelarModal(e) {
    this.myModal = e;
  }

  mostrarModal2(idVacante: number) {
    this.idVacante = idVacante;
    this.myModal2 = true;
  }
  cerrarModal2(e) {
    this.myModal2 = e;
  }
}

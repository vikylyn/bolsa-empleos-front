import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../../models/administrador/administrador.model';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: [
  ]
})
export class AdministradorComponent implements OnInit {
  myModal = false;
  myModal2 = false;
  idAdministrador: number;
  tipoOperacion: string;
  totalAdministradores = 0;
  administradores: Administrador [];
  adminTemp: Administrador [];
  desde = 0;
  cargando = true;
  adminSeleccionados: Administrador [] = [];

  constructor(private administradorService: AdministradorService,
              public loginService: LoginService,
              public router: Router) { }

  ngOnInit(): void {
   this.cargarAdministradores();
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalAdministradores) {
      this.desde -= valor;
    }
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.cargando = true;
    this.administradorService.listar(this.desde).subscribe( ({total, administradores: administradores}) => {
      this.administradores = administradores;
      this.adminTemp = administradores;
      this.totalAdministradores = total;
      this.cargando = false;
    });
  }

  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.administradores =  this.adminTemp;
    }
    this.cargando = true;
    this.administradorService.busqueda(nombre).subscribe(
      (resp: Administrador[]) => {
        this.administradores = resp;
        this.adminSeleccionados = resp;
        this.cargando = false;
      }
    );
  }
  inhabilitar(administrador: Administrador): void {
    Swal.fire({
      title: `¿Estás seguro de inhabilitar a ${administrador.nombre} ${administrador.apellidos}?`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.administradorService.inhabilitar(administrador.id).subscribe( (resp: any) => {
          Swal.fire(
            resp.mensaje,
            '',
            'success'
          );
          this.cargando = false;
          this.cargarAdministradores();
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
  habilitar(administrador: Administrador): void {
    Swal.fire({
      title: `¿Estás seguro de habilitar a ${administrador.nombre} ${administrador.apellidos}?`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.administradorService.habilitar(administrador.id).subscribe( (resp: any) => {
          Swal.fire(
            resp.mensaje,
            '',
            'success'
          );
          this.cargando = false;
          this.cargarAdministradores();
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
  mostrarModal(tipoOperacion: string, idAdministrador: number) {
    this.tipoOperacion = tipoOperacion;
    this.idAdministrador = idAdministrador;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarAdministradores();
  }

  cancelarModal(e) {
    this.myModal = e;
  }

  mostrarModal2(idAdministrador: number) {
    this.idAdministrador = idAdministrador;
    this.myModal2 = true;
  }
  cerrarModal2(e) {
    this.myModal2 = e;
  }
}

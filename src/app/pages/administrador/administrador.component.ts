import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador/administrador.model';
import { AdministradorService } from '../../services/administrador/administrador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: [
  ]
})
export class AdministradorComponent implements OnInit {

  totalAdministradores = 0;
  administradores: Administrador [];
  adminTemp: Administrador [];
  desde = 0;
  cargando = true;

  constructor(private administradorService: AdministradorService, public router: Router) { }

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
    this.administradorService.busqueda(nombre).subscribe(
      (resp: Administrador[]) => {
        this.administradores = resp;
      }
    );
  }
  deshabilitar(id: number): void {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se deshabilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.administradorService.deshabilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Administrador Deshabilitado!',
            resp.mensaje,
            'success'
          );
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


}

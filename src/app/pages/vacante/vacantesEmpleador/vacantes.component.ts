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

  vacantes: Vacante[];
  desde = 0;
  cargando = true;
  totalVacantes = 0;


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
    this.cargarVacantes();
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listar(this.loginService.empleador.id, this.desde)
    .subscribe(({total, vacantes}) => {
      this.vacantes = vacantes;
      this.totalVacantes = total;
      this.cargando = false;
    });
  }
  busqueda(nombre: string): any {
   /* if (nombre.length === 0) {
      return this.areas =  this.areasTemp;
    }
    console.log(nombre);
    this.areaLaboral.busqueda(nombre).subscribe(
      (resp: AreaLaboral[]) => {
        this.areas = resp;
      }
    );
    */
  }
  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se inhabilitara la vacante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Inhabilitar!',
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

}

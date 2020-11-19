import { Component, OnInit } from '@angular/core';
import { GrupoOcupacional } from 'src/app/models/ocupacion/grupo-ocupacional.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GrupoOcupacionalService } from '../../services/administrador/grupo-ocupacional.service';

@Component({
  selector: 'app-areas-laborales',
  templateUrl: './areas-laborales.component.html',
  styles: [
  ]
})
export class AreasLaboralesComponent implements OnInit {
  myModal = false;
  idGrupo: number;
  tipoOperacion: string;
  totalGrupos = 0;
  grupos: GrupoOcupacional [];
  gruposTemp: GrupoOcupacional [];
  desde = 0;
  cargando = true;

  constructor(private grupoService: GrupoOcupacionalService, public router: Router) { }

  ngOnInit(): void {
   this.cargarGrupos();
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalGrupos) {
      this.desde -= valor;
    }
    this.cargarGrupos();
  }

  cargarGrupos(): void {
    this.cargando = true;
    this.grupoService.listar(this.desde).subscribe( ({total, grupos}) => {
      this.grupos = grupos;
      this.gruposTemp = grupos;
      this.totalGrupos = total;
      this.cargando = false;
    });
  }

  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.grupos =  this.gruposTemp;
    }
    console.log(nombre);
    this.grupoService.busqueda(nombre).subscribe(
      (resp: GrupoOcupacional[]) => {
        this.grupos = resp;
      }
    );
  }
  inhabilitar(id: number): void {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se inhabilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Inhabilitar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.grupoService.inhabilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Inhabilitado!',
            resp.mensaje,
            'success'
          );
          this.cargarGrupos();
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
  habilitar(id: number): void {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se habilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Habilitar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.grupoService.habilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Habilitado!',
            resp.mensaje,
            'success'
          );
          this.cargarGrupos();
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
  mostrarModal(tipoOperacion: string, idGrupo: number) {
    this.tipoOperacion = tipoOperacion;
    this.idGrupo = idGrupo;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarGrupos();
  }

  cancelarModal(e) {
    this.myModal = e;
  }
}

import { Component, OnInit } from '@angular/core';
import { Ocupacion } from '../../models/ocupacion/ocupacion.model';
import { OcupacionService } from '../../services/administrador/ocupacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GrupoOcupacional } from 'src/app/models/ocupacion/grupo-ocupacional.model';
import { GrupoOcupacionalService } from '../../services/administrador/grupo-ocupacional.service';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styles: [
  ]
})
export class ProfesionComponent implements OnInit {
  myModal = false;
  idOcupacion: number;
  tipoOperacion: string;
  idGrupo = 0;
  totalOcupaciones = 0;
  ocupaciones: Ocupacion [];
  gruposOcupacionales: GrupoOcupacional[];
  ocupacionesTemp: Ocupacion [];
  desde = 0;
  cargando = true;
  constructor(public ocupacionService: OcupacionService,
              public router: Router,
              public grupoService: GrupoOcupacionalService) {
               }

  ngOnInit(): void {
   this.cargarOcupaciones();
   this.cargarGruposOcupaciones();
  }
  filtrar(): void{
    this.cargando = true;
    this.desde = 0;
    if (this.idGrupo == 0) {
      this.ocupacionService.listar(this.desde)
        .subscribe(({total, ocupaciones}) => {
          console.log(ocupaciones);
          this.ocupaciones = ocupaciones;
          this.ocupacionesTemp = ocupaciones;
          this.totalOcupaciones = total;
          this.cargando = false;
        });
    }else {
      this.ocupacionService.filtrar(this.idGrupo, this.desde)
      .subscribe(({total, ocupaciones}) => {
        console.log('totaaal', total);
        this.ocupaciones = ocupaciones;
        this.ocupacionesTemp = ocupaciones;
        this.totalOcupaciones = total;
        this.cargando = false;
      });
    }

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalOcupaciones) {
      this.desde -= valor;
    }
    this.cargarOcupaciones();
  }
  cargarGruposOcupaciones(): void {
    this.grupoService.listarTodas().subscribe( (resp: GrupoOcupacional[]) => {
      this.gruposOcupacionales = resp;
    });
  }

  cargarOcupaciones(): void {
    this.cargando = true;
    if (this.idGrupo == 0) {
      this.ocupacionService.listar(this.desde)
        .subscribe(({total, ocupaciones}) => {
          this.ocupaciones = ocupaciones;
          this.ocupacionesTemp = ocupaciones;
          this.totalOcupaciones = total;
          this.cargando = false;
        });
    }else {
      this.ocupacionService.filtrar(this.idGrupo, this.desde)
      .subscribe(({total, ocupaciones}) => {
        this.ocupaciones = ocupaciones;
        this.ocupacionesTemp = ocupaciones;
        this.totalOcupaciones = total;
        this.cargando = false;
      });
    }

  }

  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.ocupaciones =  this.ocupacionesTemp;
    }
    this.ocupacionService.busqueda(nombre).subscribe(
      (resp: Ocupacion[]) => {
        this.ocupaciones = resp;
      }
    );
  }
  inhabilitar(id: number): void {
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se inhabilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Inhabilitar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.ocupacionService.inhabilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Inhabilitado!',
            resp.mensaje,
            'success'
          );
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
  habilitar(id: number): void {
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se habilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Habilitar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.ocupacionService.habilitar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Habilitado!',
            resp.mensaje,
            'success'
          );
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
  mostrarModal(tipoOperacion: string, idOcupacion: number) {
    this.tipoOperacion = tipoOperacion;
    this.idOcupacion = idOcupacion;
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

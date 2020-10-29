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
  id_grupo = 0;
  totalOcupaciones = 0;
  ocupaciones: Ocupacion [];
  grupos_ocupacionales: GrupoOcupacional[];
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
    if (this.id_grupo == 0) {
      this.ocupacionService.listar(this.desde)
        .subscribe(({total, ocupaciones}) => {
          console.log(ocupaciones);
          this.ocupaciones = ocupaciones;
          this.ocupacionesTemp = ocupaciones;
          this.totalOcupaciones = total;
          this.cargando = false;
        });
    }else {
      this.ocupacionService.filtrar(this.id_grupo, this.desde)
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
      this.grupos_ocupacionales = resp;
    });
  }

  cargarOcupaciones(): void {
    this.cargando = true;
    if (this.id_grupo == 0) {
      this.ocupacionService.listar(this.desde)
        .subscribe(({total, ocupaciones}) => {
          this.ocupaciones = ocupaciones;
          this.ocupacionesTemp = ocupaciones;
          this.totalOcupaciones = total;
          this.cargando = false;
        });
    }else {
      this.ocupacionService.filtrar(this.id_grupo, this.desde)
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
  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se inhabilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.ocupacionService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
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

}

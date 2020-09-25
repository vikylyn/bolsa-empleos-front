import { Component, OnInit } from '@angular/core';
import { Profesion } from '../../models/profesion/profesion.model';
import { ProfesionService } from '../../services/administrador/profesion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AreaLaboral } from 'src/app/models/profesion/area-laboral.model';
import { AreaLaboralService } from '../../services/administrador/area-laboral.service';
import { ActividadLaboral } from '../../models/profesion/actividad-laboral.model';
import { ActividadLaboralService } from '../../services/administrador/actividad-laboral.service';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styles: [
  ]
})
export class ProfesionComponent implements OnInit {
  id_area = 0;
  id_actividad = 0;
  totalProfesiones = 0;
  profesiones: Profesion [];
  areas_laborales: AreaLaboral[];
  actividades_laborales: ActividadLaboral[];
  profesionesTemp: Profesion [];
  desde = 0;
  cargando = true;
  constructor(public profesionService: ProfesionService,
              public router: Router,
              public areaService: AreaLaboralService,
              public actividadService: ActividadLaboralService) {

               }

  ngOnInit(): void {
   this.cargarProfesiones();
   this.cargarAreas();
   this.cargarActividades();
  }
  filtrar(): void{
    this.cargando = true;
    this.desde = 0;
    if (this.id_area == 0 && this.id_actividad == 0) {
      this.profesionService.listar(this.desde)
        .subscribe(({total, profesiones}) => {
          console.log(profesiones);
          this.profesiones = profesiones;
          this.profesionesTemp = profesiones;
          this.totalProfesiones = total;
          this.cargando = false;
        });
    }else {
      this.profesionService.filtrar(this.id_area, this.id_actividad, this.desde)
      .subscribe(({total, profesiones}) => {
        this.profesiones = profesiones;
        this.profesionesTemp = profesiones;
        this.totalProfesiones = total;
        this.cargando = false;
      });
    }

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalProfesiones) {
      this.desde -= valor;
    }
    this.cargarProfesiones();
  }
  cargarAreas(): void {
    this.areaService.listarTodas().subscribe( (resp: AreaLaboral[]) => {
      this.areas_laborales = resp;
    });
  }
  cargarActividades(): void {
    this.actividadService.listar().subscribe( (resp: ActividadLaboral[]) => {
      this.actividades_laborales = resp;
    });
  }
  cargarProfesiones(): void {
    this.cargando = true;
    if (this.id_area == 0 && this.id_actividad == 0) {
      this.profesionService.listar(this.desde)
        .subscribe(({total, profesiones}) => {
          this.profesiones = profesiones;
          this.profesionesTemp = profesiones;
          this.totalProfesiones = total;
          this.cargando = false;
        });
    }else {
      this.profesionService.filtrar(this.id_area, this.id_actividad, this.desde)
      .subscribe(({total, profesiones}) => {
        this.profesiones = profesiones;
        this.profesionesTemp = profesiones;
        this.totalProfesiones = total;
        this.cargando = false;
      });
    }

  }

  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.profesiones =  this.profesionesTemp;
    }
    this.profesionService.busqueda(nombre).subscribe(
      (resp: Profesion[]) => {
        this.profesiones = resp;
      }
    );
  }
  eliminar(id: number): void {
    Swal.fire({
      title: 'Estas seguro ?',
      text: 'Se deshabilitara el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.profesionService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargarProfesiones();
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

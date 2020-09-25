import { Component, OnInit } from '@angular/core';
import { AreaLaboralService } from '../../services/administrador/area-laboral.service';
import { AreaLaboral } from 'src/app/models/profesion/area-laboral.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-laborales',
  templateUrl: './areas-laborales.component.html',
  styles: [
  ]
})
export class AreasLaboralesComponent implements OnInit {
  totalAreas = 0;
  areas: AreaLaboral [];
  areasTemp: AreaLaboral [];
  desde = 0;
  cargando = true;

  constructor(private areaLaboral: AreaLaboralService, public router: Router) { }

  ngOnInit(): void {
   this.cargarAreas();
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalAreas) {
      this.desde -= valor;
    }
    this.cargarAreas();
  }

  cargarAreas(): void {
    this.cargando = true;
    this.areaLaboral.listar(this.desde).subscribe( ({total, areas}) => {
      this.areas = areas;
      this.areasTemp = areas;
      this.totalAreas = total;
      this.cargando = false;
    });
  }

  busqueda(nombre: string): any {
    if (nombre.length === 0) {
      return this.areas =  this.areasTemp;
    }
    console.log(nombre);
    this.areaLaboral.busqueda(nombre).subscribe(
      (resp: AreaLaboral[]) => {
        this.areas = resp;
      }
    );
  }
  eliminar(id: number): void {
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
        this.areaLaboral.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargarAreas();
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OcupacionService } from '../../../services/administrador/ocupacion.service';
import { ReporteService } from '../../../services/reportes/reporte.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { Ocupacion } from '../../../models/ocupacion/ocupacion.model';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { Contratacion } from '../../../models/empleador/contratacion.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { LoginService } from '../../../services/login.service';
declare var $:any;

@Component({
  selector: 'app-reporte-contrataciones',
  templateUrl: './reporte-contrataciones.component.html',
  styles: [
  ]
})
export class ReporteContratacionesComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private ocupacionService: OcupacionService,
              private reporteService: ReporteService,
              public loginService: LoginService,
              private ubicacionService: UbicacionService)
    {
    }

  ocupaciones: Ocupacion[];
  paises: Pais[];
  ciudades: Ciudad[];
  formSubmitted = false;
  contrataciones: Contratacion[] = [];
  ocupacion: Ocupacion;
  total = 0;
  desde: string;
  hasta: string;
  fechaActual = new Date();
  public reporteForm = this.fb.group({
    habilitado: ['true', [ Validators.required]],
    id_ocupacion: [null, [Validators.required, Validators.min(0)]],
    id_ciudad: [0, [Validators.required, Validators.min(0)]],
    id_pais: [1, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    $('#daterange4').daterangepicker(
      {
        locale : {
          format : 'YYYY-MM-DD',
          separator : ' / ',
          applyLabel : 'Guardar',
          cancelLabel : 'Cancelar',
          fromLabel : 'Desde',
          toLabel : 'Hasta',
          customRangeLabel : 'Personalizar',
          daysOfWeek : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju',
             'Vi', 'Sa' ],
          monthNames : [ 'Enero', 'Febrero', 'Marzo',
             'Abril', 'Mayo', 'Junio', 'Julio',
             'Agosto', 'Setiembre', 'Octubre',
             'Noviembre', 'Diciembre' ],
          firstDay : 1
        },
      //  startDate : '01-01-2020',
      //  endDate : '30-12-2020',
        opens : 'center'
      }).on('change', () => {
        this.obtenerFechas();
      });
    this.obtenerFechas();
    this.ocupacionService.listarProfesiones()
    .subscribe( (resp: Ocupacion[]) => {
      this.ocupaciones = resp;
    }, (err) => console.log(err));
    this.ubicacionService.listarPaises()
        .subscribe( (resp: Pais[]) => {
          this.paises = resp;
        });
    this.ubicacionService.listarCiudades(1)
        .subscribe((resp: Ciudad[]) => {
          this.ciudades = resp;
        });
  }

  campoNoValido( campo: string): boolean {
    if (this.reporteForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  filtrar(): void {
    const fechas = $('#daterange4').val();
    let fechasSeparadas: string[];
    fechasSeparadas = fechas.split('/', 3);
    fechasSeparadas[0] = fechasSeparadas[0].substring(0, fechasSeparadas[0].length - 1) + ' 00:00:00';
    fechasSeparadas[1] = fechasSeparadas[1].substring(1, fechasSeparadas[1].length) + ' 23:59:59';
    // fechasSeparadas[0] = fechasSeparadas[0].replace(/[-]/gi, '/');
   // fechasSeparadas[1] = fechasSeparadas[1].replace(/[-]/gi, '/');
    this.formSubmitted = true;
    if (this.reporteForm.invalid) {
      return;
    }
    const objFechas = {
      fecha_inicio: fechasSeparadas[0],
      fecha_fin: fechasSeparadas[1]
    };
    const formularioCompleto = Object.assign(this.reporteForm.value, objFechas);
    this.reporteService.generarListadoContrataciones(formularioCompleto).subscribe(({contrataciones, total }) => {
       this.contrataciones = contrataciones;
       this.total = total;
       console.log(contrataciones);
    });
  }

  obtenerFechas(): void {
    const fechas = $('#daterange4').val();
    let fechasSeparadas: string[];
    fechasSeparadas = fechas.split('/', 3);
    fechasSeparadas[0] = fechasSeparadas[0].substring(0, fechasSeparadas[0].length - 1);
    fechasSeparadas[1] = fechasSeparadas[1].substring(1, fechasSeparadas[1].length);
    this.desde = fechasSeparadas[0];
    this.hasta = fechasSeparadas[1];
  }
  generarPDF(){

    const doc = new jsPDF({orientation: 'landscape'});

    doc.setFontSize(20);
    doc.text(90, 30, 'Reporte de Contrataciones');

    doc.autoTable({
      startY: 50,
      theme: 'plain',
      html: '#encabezado',
    });
    doc.autoTable({ html: '#lista' });

    doc.save();
  }
}

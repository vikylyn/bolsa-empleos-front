import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OcupacionService } from '../../../../services/administrador/ocupacion.service';
import { ReporteService } from '../../../../services/reportes/reporte.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { Ocupacion } from '../../../../models/ocupacion/ocupacion.model';
import { Pais } from '../../../../models/pais.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { Contratacion } from '../../../../models/empleador/contratacion.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { LoginService } from '../../../../services/login.service';
import { DatePipe } from '@angular/common';
import { InformacionApp } from '../../../../models/informacion-app.model';
import { InformacionAppService } from '../../../../services/informacion-app.service';
import Swal from 'sweetalert2';
declare var $: any;

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
              private infoService: InformacionAppService,
              private datePipe: DatePipe,
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
  desde: Date;
  hasta: Date;
  fechaActual = new Date();
  informacion: InformacionApp;
  cargando = false;
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
          format : 'DD-MM-YYYY',
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
          this.paises = resp.filter( (pais: Pais) => pais.nombre === 'Bolivia');
        });
    this.ubicacionService.listarCiudades(1)
        .subscribe((resp: Ciudad[]) => {
          this.ciudades = resp;
        });
    this.infoService.buscar(1)
        .subscribe( (resp: InformacionApp) => {
        this.informacion = resp;
    });
  }

  campoNoValido( campo: string): boolean {
    if (this.reporteForm.get(campo).invalid && this.reporteForm.get(campo).touched) {
      return true;
    }else if (this.reporteForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  filtrar(): void {
    this.formSubmitted = true;
    if (this.reporteForm.invalid) {
      return;
    }
    const objFechas = {
      fecha_inicio: this.desde,
      fecha_fin: this.hasta
    };
    const formularioCompleto = Object.assign(this.reporteForm.value, objFechas);
    this.cargando = true;
    this.reporteService.generarListadoContrataciones(formularioCompleto).subscribe(({contrataciones, total }) => {
       this.contrataciones = contrataciones;
       this.total = total;
       this.cargando = false;
       Swal.fire(
        'Filtrado exitoso!',
        '',
        'success'
      );
    });
  }

  generarPDF(){

    const doc = new jsPDF({orientation: 'landscape'});

    doc.setFontSize(10);

    let logo = new Image();
    logo.src = this.informacion.imagen.url;

    doc.setFontSize(20);
    doc.text(110, 40, 'Reporte de Contrataciones');

    doc.setFontSize(12);
    doc.text(112, 46, 'Desde: ' + this.datePipe.transform(this.desde, 'short') + '  Hasta:  '
    + this.datePipe.transform(this.hasta, 'short'));

    doc.autoTable({ startY: 50,
                    html: '#lista',
                    margin: { top: 40 },
                  });
    const pages = doc.internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.width;  //Optional
    const pageHeight = doc.internal.pageSize.height;  //Optional
    doc.setFontSize(10);  //Optional

    for (let j = 1; j < pages + 1 ; j++) {
        let horizontalPos = pageWidth / 2;  //Can be fixed number
        let verticalPos = pageHeight - 10;  //Can be fixed number
        doc.setPage(j);
        doc.text(`${j} de ${pages}`,  horizontalPos, verticalPos, 'right', 'middle');
    }


    // encabezado de pagina
    for (let j = 1; j < pages + 1 ; j++) {
      doc.setPage(j);
      doc.addImage(logo, 'JPEG', 15, 11,20,20);
      doc.text(40, 15, this.informacion.nombre + ' ' + this.informacion.eslogan);
      doc.text(40, 20, 'email: ' + this.informacion.email + ' telefono: ' + this. informacion.telefono);
      doc.text(40, 25, 'fecha actual: ' + this.datePipe.transform(new Date(), 'short') );
      doc.text(40, 30, 'usuario: ' + this.loginService.administrador.nombre + ' ' + this.loginService.administrador.apellidos
      + ' - ' + this.loginService.administrador.credenciales.email);
    }

    doc.save('reporte-contrataciones.pdf');
  }
  obtenerFechas(): void {
    const fechas = $('#daterange4').val();
    let fechasSeparadas: string[];
    fechasSeparadas = fechas.split('/', 3);
    fechasSeparadas[0] = fechasSeparadas[0].substring(0, fechasSeparadas[0].length - 1);
    fechasSeparadas[1] = fechasSeparadas[1].substring(1, fechasSeparadas[1].length);

    const fecha1: string [] = fechasSeparadas[0].split('-', 3);
    const fecha2: string [] = fechasSeparadas[1].split('-', 3);

    this.desde = new Date(fecha1[1] + '/' + fecha1[0] + '/' + fecha1[2] + ' 00:00:00');
    this.hasta = new Date(fecha2[1] + '/' + fecha2[0] + '/' + fecha2[2] + ' 23:59:59');
  }
}

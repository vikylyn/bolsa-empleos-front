import { Component, OnInit } from '@angular/core';
import { Ocupacion } from '../../../models/ocupacion/ocupacion.model';
import { OcupacionService } from '../../../services/administrador/ocupacion.service';
import { TipoContrato } from '../../../models/empleador/tipo-contrato.model';
import { TipoContratoService } from '../../../services/vacante/tipo-contrato.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { Ciudad } from '../../../models/ciudad.model';
import { Pais } from '../../../models/pais.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Fecha } from '../../../interfaces/fechas';
import { VacanteService } from '../../../services/vacante/vacante.service';
import { Vacante } from 'src/app/models/empleador/vacante.model';
import { EmpresaService } from '../../../services/empleador/empresa.service';
import { Empresa } from '../../../models/empleador/empresa.model';

@Component({
  selector: 'app-inicio-solicitante',
  templateUrl: './inicio-solicitante.component.html',
  styles: [
  ]
})
export class InicioSolicitanteComponent implements OnInit {
  ocupaciones: Ocupacion[];
  tipo_contratos: TipoContrato[];
  ciudades: Ciudad[];
  paises: Pais[];
  fechas: Fecha[];
  fechaActual = new Date();
  desde = 0;
  vacantes: Vacante[];
  vacantes2: Vacante[];
  mostrar = true;
  public filtradoForm = this.fb.group({
    id_ocupacion: [5, Validators.required],
    fecha: [`${this.fechaActual.getFullYear()}-${this.fechaActual.getMonth()}-${this.fechaActual.getDate()}`, [Validators.required]],
    id_ciudad: [12, Validators.required],
    id_pais: [1, Validators.required],
    id_tipo_contrato: [1, [Validators.required]]
  });

  constructor( private ocupacionService: OcupacionService,
               private tipoContratoService: TipoContratoService,
               private ubicacionService: UbicacionService,
               private fb: FormBuilder,
               private vacanteService: VacanteService,
               private empresaService: EmpresaService
    ) {
       this.listarOcupaciones();
       this.listarTipoContratos();
       this.cargarPaises();
       this.cargarCiudades(1);
       this.cargarFechas();
      }

  ngOnInit(): void {
  }

  listarOcupaciones(): void {
    this.ocupacionService.listarProfesiones()
        .subscribe( (resp: Ocupacion[]) => {
        this.ocupaciones = resp;
      }, (err) => console.log(err));
  }
  listarTipoContratos(): void {
    this.tipoContratoService.listar().subscribe((resp: TipoContrato[]) => {
      this.tipo_contratos = resp;
      console.log(this.tipo_contratos);
    });
  }

  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
    });
  }
  cargarCiudades(id_pais: number): void {
    this.ubicacionService.listarCiudades(id_pais).subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  cargarFechas(): void {
      this.fechas = [
        {id: 0, fecha: this.restarDias(new Date() , 0), descripcion: 'Cualquiera'},
        {id: 1, fecha: this.restarDias(new Date() , 1), descripcion: 'Ayer'},
        {id: 5, fecha: this.restarDias(new Date() , 5), descripcion: 'Hace 5 dias'},
        {id: 15, fecha: this.restarDias(new Date() , 15), descripcion: 'Hace 15 dias'},
        {id: 30, fecha: this.restarDias(new Date() , 30), descripcion: 'Hace 30 dias'}
      ];

  }

  restarDias(fecha: Date, dias: number): string{
    fecha.setDate(fecha.getDate() - dias);
    return `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`;
  }
  buscar(): void {
    console.log(this.filtradoForm.value);
    this.vacanteService.filtrar(this.filtradoForm.value, this.desde).subscribe(
      (resp: Vacante[]) => {
        this.vacantes = resp;
        this.cargarEmpresas();
        this.mostrar = false;

      }
    );
  }

  cargarEmpresas(): void {
    this.vacantes2 = this.vacantes.map((x: Vacante) => {
      if ( x.empleador.empresa) {
        this.empresaService.buscarPorIdEmpleador(x.empleador.id)
            .subscribe((resp: Empresa) => {
              x.empresa = resp;
            });
        return x;

      }else {
        return x;
      }
    });
 
  }

}

import { Component, OnInit } from '@angular/core';
import { Ocupacion } from '../../../../models/ocupacion/ocupacion.model';
import { TipoContrato } from '../../../../models/empleador/tipo-contrato.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { Pais } from '../../../../models/pais.model';
import { Fecha } from '../../../../interfaces/fechas';
import { Solicitante } from '../../../../models/solicitante/solicitante.model';
import { OcupacionService } from '../../../../services/administrador/ocupacion.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SolicitanteService } from '../../../../services/solicitante/solicitante.service';

@Component({
  selector: 'app-inicio-empleador',
  templateUrl: './inicio-empleador.component.html',
  styles: [
  ]
})
export class InicioEmpleadorComponent implements OnInit {
  myModal = false;
  idSolicitante: number;
  ocupaciones: Ocupacion[];
  tipoContratos: TipoContrato[];
  ciudades: Ciudad[];
  paises: Pais[];
  fechas: Fecha[];
  fechaActual: Date;
  desde = 0;
  solicitantes: Solicitante[];
  mostrar = true;
  formSubmitted = false;
  sinResultados = false;
  total = 0;
  ocupacion: Ocupacion;
  cargando = false;
  public filtradoForm;

  constructor( private ocupacionService: OcupacionService,
               private ubicacionService: UbicacionService,
               private fb: FormBuilder,
               private solicitanteService: SolicitanteService) {
       this.fechaActual = new Date();
       this.listarOcupaciones();
       this.cargarPaises();
       this.cargarCiudades(1);
       this.cargarFechas();
       this.filtradoForm = this.fb.group({
        id_ocupacion: [null, Validators.required],
        fecha: [`${this.fechaActual.getFullYear()}-${this.fechaActual.getMonth() + 1}-${this.fechaActual.getDate()}`, [Validators.required]],
        id_ciudad: [0, Validators.required],
        id_pais: [1, Validators.required],
        ascendente:[true, [Validators.required]]
      });
      }

  ngOnInit(): void {
  }
  campoNoValido( campo: string): boolean {
    if (this.filtradoForm.get(campo).invalid && this.filtradoForm.get(campo).touched) {
      return true;
    }else if (this.filtradoForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  listarOcupaciones(): void {
    this.ocupacionService.listarProfesiones()
        .subscribe( (resp: Ocupacion[]) => {
        this.ocupaciones = resp;
      }, (err) => console.log(err));
  }


  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp.filter( (pais: Pais) => pais.nombre === 'Bolivia');
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
    const mes = fecha.getMonth() + 1;
    return `${fecha.getFullYear()}-${mes}-${fecha.getDate()}`;
  }
  buscar(): void {
    this.formSubmitted = true;
    if (this.filtradoForm.invalid) {
      return;
    }
    this.cargarOcupacion();
    this.cargando = true;
    this.solicitanteService.filtrar(this.filtradoForm.value, this.desde).subscribe(
      ({solicitantes, total}) => {
        this.solicitantes = solicitantes;
        this.total = total;
        // ocultando panel de busqueda
        this.mostrar = false;
        this.cargando = false;
        if (this.solicitantes.length === 0 ) {
          this.sinResultados = true;
          this.mostrar = true;
        }else {
          this.sinResultados = false;
        }
      }
    );
  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.total) {
      this.desde -= valor;
    }
    this.buscar();
  }
  cargarOcupacion():void {
    let id: number = this.filtradoForm.get('id_ocupacion').value;
    this.ocupacion = this.ocupaciones.find((elemento: Ocupacion) => {
      return elemento.id === id;
    });
  }

  mostrarModal(idSolicitante: number) {
    this.idSolicitante = idSolicitante;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
  }

}

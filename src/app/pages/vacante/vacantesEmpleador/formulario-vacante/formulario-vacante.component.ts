import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vacante } from 'src/app/models/empleador/vacante.model';
import { Idioma } from '../../../../models/idioma/idioma.model';
import { Horario } from '../../../../models/empleador/horario.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { Pais } from '../../../../models/pais.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaLaboralService } from '../../../../services/solicitante/curriculum/experiencia-laboral.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { RangoSueldo } from '../../../../models/empleador/rango-sueldo.model';
import { TipoContrato } from '../../../../models/empleador/tipo-contrato.model';
import { Ocupacion } from '../../../../models/ocupacion/ocupacion.model';
import { HorarioService } from '../../../../services/vacante/horario.service';
import { TipoContratoService } from '../../../../services/vacante/tipo-contrato.service';
import { RangoSueldoService } from '../../../../services/vacante/rango-sueldo.service';
import { IdiomaService } from '../../../../services/solicitante/curriculum/idioma.service';
import { OcupacionService } from '../../../../services/administrador/ocupacion.service';
import Swal from 'sweetalert2';
import { VacanteService } from '../../../../services/vacante/vacante.service';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-formulario-vacante',
  templateUrl: './formulario-vacante.component.html',
  styles: [
  ]
})
export class FormularioVacanteComponent implements OnInit {
  cargando = false;
  cargarformulario = false;
  formSubmitted = false;
  vacanteForm: FormGroup;
  vacante: Vacante;
  tipo: string;
  id: number;
  idiomas: Idioma[];
  horarios: Horario[];
  ciudades: Ciudad[];
  paises: Pais[];
  sueldos: RangoSueldo[];
  tipo_contratos: TipoContrato[];
  ocupaciones: Ocupacion[];

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private ubicacionService: UbicacionService,
          private horarioService: HorarioService,
          private tipoContratoService: TipoContratoService,
          private rangoSueldoService: RangoSueldoService,
          private idiomaService: IdiomaService,
          private ocupacionService: OcupacionService,
          private vacanteService: VacanteService,
          private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarCiudades(1);
    this.cargarHorarios();
    this.cargarTipoContratos();
    this.cargarSueldos();
    this.cargarIdiomas();
    this.cargarOcupaciones();
    this.route.queryParams
    .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        if (params.tipo === 'modificar') {
              this.cargarVacante(params);
        }else{
              this.cargarformulario = true;
              this.vacanteForm = this.fb.group({
              titulo: ['', [ Validators.required]],
              id_sueldo: [0, [ Validators.required]],
              direccion: ['', [ Validators.required]],
              id_horario: [0, [ Validators.required]],
              num_vacantes: [0, [ Validators.required]],
              descripcion: ['', [ Validators.required]],
          //    ciudad: ['', [ Validators.required]],
              habilitado: [ true , [Validators.required]],
              id_tipo_contrato: [0, [ Validators.required]],
              id_pais: [1, [ Validators.required]],
              id_ciudad: [null, [ Validators.required]],
              id_empleador: [ this.loginService.empleador.id, [ Validators.required]],

              experiencia: ['', [ Validators.required]],
              genero: [ 0 , [ Validators.required]],
              id_ocupacion: [null, [ Validators.required]],
              id_idioma: [0, [ Validators.required]],

        });
      }
    });
  }
  cargarOcupaciones(): void {
    this.ocupacionService.listarProfesiones()
    .subscribe( (resp: Ocupacion[]) => {
      this.ocupaciones = resp;
    }, (err) => console.log(err));
  }
  cargarIdiomas(): void {
    this.idiomaService.listarIdiomas().subscribe(({idiomas}) => {
      this.idiomas = idiomas;
    });
  }
  cargarSueldos(): void {
    this.rangoSueldoService.listar().subscribe((resp: RangoSueldo[]) => {
      this.sueldos = resp;
    });
  }
  cargarTipoContratos(): void {
    this.tipoContratoService.listar().subscribe((resp: TipoContrato[]) => {
      this.tipo_contratos = resp;
    });
  }
  cargarHorarios(): void {
    this.horarioService.listar().subscribe((resp: Horario[]) => {
      this.horarios = resp;
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
  cargarVacante(params: any): void {
        this.vacanteService.buscar(params.id)
        .subscribe((resp: Vacante) => {
        this.vacante = resp;
        this.vacanteForm = this.fb.group({
              titulo: [this.vacante.titulo, [ Validators.required]],
              id_sueldo: [this.vacante.sueldo.id, [ Validators.required]],
              direccion: [this.vacante.direccion, [ Validators.required]],
              id_horario: [this.vacante.horario.id, [ Validators.required]],
              num_vacantes: [this.vacante.num_vacantes, [ Validators.required]],
              descripcion: [this.vacante.descripcion, [ Validators.required]],
              habilitado: [ this.vacante.habilitado , [Validators.required]],
              id_tipo_contrato: [this.vacante.tipo_contrato.id, [ Validators.required]],
              id_pais: [this.vacante.ciudad.estado.pais.id, [ Validators.required]],
              id_ciudad: [this.vacante.ciudad.id, [ Validators.required]],
              id_empleador: [ this.loginService.empleador.id, [ Validators.required]],

              experiencia: [this.vacante.requisitos.experiencia, [ Validators.required]],
              genero: [ this.vacante.requisitos.genero , [ Validators.required]],
              id_ocupacion: [this.vacante.requisitos.ocupacion.id, [ Validators.required]],
              id_idioma: [this.vacante.requisitos.idioma.id, [ Validators.required]],
              id_requisitos: [this.vacante.requisitos.id, [ Validators.required]],


      });
      this.cargarformulario = true;
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.vacanteForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
  }
  selectNoValido( campo: string): boolean {
    const id = this.vacanteForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  select2NoValido( campo: string): boolean {
    const id = this.vacanteForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  guardar(): void {
    this.formSubmitted = true;
    console.log(this.vacanteForm.value);
    if (this.vacanteForm.get('id_sueldo').value === 0 ||
        this.vacanteForm.get('id_tipo_contrato').value === 0 ||
        this.vacanteForm.get('id_pais').value === 0 ||
        this.vacanteForm.get('id_ciudad').value === 0 ||
        this.vacanteForm.get('id_empleador').value === 0 ||
        this.vacanteForm.get('id_ocupacion').value === 0 ||
        this.vacanteForm.get('id_idioma').value === 0 ||
        this.vacanteForm.get('num_vacantes').value <= 0 ||
        this.vacanteForm.get('id_horario').value === 0) {
      return;
    }
    if (this.vacanteForm.invalid) {
      return;
    }
    console.log(this.vacanteForm.value);
    if (this.tipo === 'modificar') {
      this.vacanteService.modificar(this.vacanteForm.value, this.vacante.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/vacante');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Experiencia', err.error.error || err.error.mensaje, 'error');
          });
      
    }else {
     this.vacanteService.adicionar(this.vacanteForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/vacante');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar vacante', err.error.mensaje, 'error');
          });
    }
  
  }

}

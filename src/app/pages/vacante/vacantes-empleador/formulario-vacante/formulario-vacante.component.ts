import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vacante } from 'src/app/models/empleador/vacante.model';
import { Idioma } from '../../../../models/idioma/idioma.model';
import { Horario } from '../../../../models/empleador/horario.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { Pais } from '../../../../models/pais.model';
import { ActivatedRoute} from '@angular/router';
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
import { NivelIdioma } from '../../../../models/idioma/nivel-idioma.model';
import { RequisitosIdioma } from '../../../../models/empleador/requisitos-idioma.model';

@Component({
  selector: 'app-formulario-vacante',
  templateUrl: './formulario-vacante.component.html',
  styles: [
  ]
})
export class FormularioVacanteComponent implements OnInit {
  @Input() visible: boolean;
  @Input() tipoOperacion: string;
  @Input() idVacante: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  myModal = false;
  cargando = false;
  cargarformulario = false;
  formSubmitted = false;
  formSubmitted2 = false;
  vacanteForm: FormGroup;
  requisitosForm: FormGroup;
  vacante: Vacante;
  horarios: Horario[];
  ciudades: Ciudad[];
  paises: Pais[];
  sueldos: RangoSueldo[];
  tipoContratos: TipoContrato[];
  ocupaciones: Ocupacion[];
  siguiente = false;
  idiomasSeleccionados: RequisitosIdioma[] = [];
  constructor(
          private fb: FormBuilder,
          private ubicacionService: UbicacionService,
          private horarioService: HorarioService,
          private tipoContratoService: TipoContratoService,
          private rangoSueldoService: RangoSueldoService,
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
    this.cargarOcupaciones();
    if (this.tipoOperacion === 'modificar') {
              this.cargarVacante();
    }else{
              this.cargarformulario = true;
              this.vacanteForm = this.fb.group({
                  titulo: ['', [ Validators.required]],
                  id_sueldo: [0, [ Validators.required, Validators.min(1)]],
                  direccion: ['', [ Validators.required]],
                  id_horario: [0, [ Validators.required, Validators.min(1)]],
                  num_vacantes: [0, [ Validators.required, Validators.min(1)]],
                  descripcion: ['', [ Validators.required]],
                  habilitado: [ true , [Validators.required]],
                  id_tipo_contrato: [0, [ Validators.required, Validators.min(1)]],
                  id_pais: [1, [ Validators.required, Validators.min(1)]],
                  id_ciudad: [null, [ Validators.required, Validators.min(1)]],
                  id_empleador: [ this.loginService.empleador.id, [ Validators.required]]
              });
              this.requisitosForm = this.fb.group({
                experiencia: ['', [ Validators.required, Validators.min(0)]],
                genero: [ 'seleccionar' , [ Validators.required, Validators.maxLength(1)]],
                id_ocupacion: [null, [ Validators.required, Validators.min(1)]]
            });
    }
  }
  cargarOcupaciones(): void {
    this.ocupacionService.listarProfesiones()
    .subscribe( (resp: Ocupacion[]) => {
      this.ocupaciones = resp;
    }, (err) => console.log(err));
  }
  cargarSueldos(): void {
    this.rangoSueldoService.listar().subscribe((resp: RangoSueldo[]) => {
      this.sueldos = resp;
    });
  }
  cargarTipoContratos(): void {
    this.tipoContratoService.listar().subscribe((resp: TipoContrato[]) => {
      this.tipoContratos = resp;
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
  cargarCiudades(idPais: number): void {
    this.ubicacionService.listarCiudades(idPais).subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  cargarVacante(): void {
        this.vacanteService.buscar(this.idVacante)
        .subscribe((resp: Vacante) => {
        this.vacante = resp;
        this.vacanteForm = this.fb.group({
              titulo: [this.vacante.titulo, [ Validators.required]],
              id_sueldo: [this.vacante.sueldo.id, [ Validators.required, Validators.min(1)]],
              direccion: [this.vacante.direccion, [ Validators.required]],
              id_horario: [this.vacante.horario.id, [ Validators.required, Validators.min(1)]],
              num_vacantes: [this.vacante.num_vacantes, [ Validators.required, Validators.min(this.vacante.num_postulantes_aceptados)]],
              descripcion: [this.vacante.descripcion, [ Validators.required]],
              habilitado: [ this.vacante.habilitado , [Validators.required]],
              id_tipo_contrato: [this.vacante.tipo_contrato.id, [ Validators.required, Validators.min(1)]],
              id_pais: [this.vacante.ciudad.estado.pais.id, [ Validators.required, Validators.min(1)]],
              id_ciudad: [this.vacante.ciudad.id, [ Validators.required, Validators.min(1)]],
              id_empleador: [ this.loginService.empleador.id, [ Validators.required]],
              id_requisitos: [this.vacante.requisitos.id, [ Validators.required]],
              num_disponibles: [ this.vacante.num_disponibles, [Validators.required, 
                                  Validators.min(this.vacante.num_vacantes - this.vacante.num_postulantes_aceptados)]],
              num_postulantes_aceptados: [this.vacante.num_postulantes_aceptados, [Validators.required]]


        });
        this.requisitosForm = this.fb.group({
          experiencia: [this.vacante.requisitos.experiencia, [ Validators.required, Validators.min(0)]],
          genero: [ this.vacante.requisitos.genero , [ Validators.required]],
          id_ocupacion: [this.vacante.requisitos.ocupacion.id, [ Validators.required, Validators.min(1)]],
        });
        this.idiomasSeleccionados = this.vacante.requisitos.idiomas;
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
  campoNoValido2( campo: string): boolean {
    if (this.requisitosForm.get(campo).invalid && this.formSubmitted2) {
      return true;
    }else {
      return false;
   }
  }
  filtrarCiudades(): void {
    const idPais = this.vacanteForm.get('id_pais').value;
    this.cargarCiudades(idPais);
  }
  siguienteFormulario(): any {
    this.formSubmitted = true;
    console.log(this.vacanteForm.value);
    if (this.vacanteForm.invalid) {
      return;
    }
    this.siguiente = true;
  }
  guardar(): void {
    this.formSubmitted2 = true;
    if (this.requisitosForm.invalid || this.idiomasSeleccionados.length < 1) {
      return;
    }
    let formularioCompleto = Object.assign(this.vacanteForm.value, this.requisitosForm.value);
    const objIdiomas = {
        idiomas: this.idiomasSeleccionados
      };
    formularioCompleto = Object.assign(formularioCompleto, objIdiomas);
    if (this.tipoOperacion === 'modificar') {
      this.vacanteService.modificar(formularioCompleto, this.vacante.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Vacante', err.error.error || err.error.mensaje, 'error');
          });
    }else {
      this.vacanteService.adicionar(formularioCompleto)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar vacante', err.error.mensaje, 'error');
          });
    }
  }
  modificarNumDisponibles() {
    console.log(this.vacanteForm.get('num_vacantes').value);
    this.vacanteForm.patchValue({ num_disponibles : this.vacanteForm.get('num_vacantes').value - this.vacanteForm.get('num_postulantes_aceptados').value });
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }

  cancelarModal2(e) {
    this.myModal = e;
    this.visible = true;
  }
  cerrarModal2(e) {
    this.myModal = e;
    this.visible = true;
  }

  mostrarModal() {
    this.visible = false;
    this.myModal = true;
  }
  guardarIdioma(e) {
    console.log('idioma desde el padre: ', e);
    this.idiomasSeleccionados.push(e);
  }

  eliminarIdioma(idioma: RequisitosIdioma) {
      this.idiomasSeleccionados = this.removerElemento(this.idiomasSeleccionados, idioma);
  }
  removerElemento( arr: RequisitosIdioma[], item: RequisitosIdioma) {
    return arr.filter( ( e: RequisitosIdioma ) => {
        return e.idioma.nombre !== item.idioma.nombre;
    });
  }
}

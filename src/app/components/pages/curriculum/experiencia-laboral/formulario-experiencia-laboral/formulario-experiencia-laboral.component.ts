import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienciaLaboralService } from '../../../../../services/solicitante/curriculum/experiencia-laboral.service';
import { Pais } from '../../../../../models/pais.model';
import { UbicacionService } from '../../../../../services/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';
import { ExperienciaLaboral } from '../../../../../models/curriculum/experiencia-laboral.model';
import { TipoContrato } from '../../../../../models/empleador/tipo-contrato.model';
import { TipoContratoService } from '../../../../../services/vacante/tipo-contrato.service';
import { Ciudad } from '../../../../../models/ciudad.model';
import { ValidacionFormularioService } from '../../../../../services/validacion-formulario.service';

@Component({
  selector: 'app-formulario-experiencia-laboral',
  templateUrl: './formulario-experiencia-laboral.component.html',
  styles: [
  ]
})
export class FormularioExperienciaLaboralComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() idExperiencia: number;
  @Input() tipo: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();


  cargarformulario = false;
  cargandoModal = true;
  cargando = false;
  formSubmitted = false;
  experienciaForm: FormGroup;
  experiencia: ExperienciaLaboral;
  paises: Pais[];
  tipoContratos: TipoContrato[];
  mostrarCampos = false;
  ciudades: Ciudad[] ;

  constructor(
          private fb: FormBuilder,
          private experienciaService: ExperienciaLaboralService,
          private tipoContratoService: TipoContratoService,
          private ubicacionService: UbicacionService,
          public validacionService: ValidacionFormularioService,
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarTipoContratos();
    if (this.tipo === 'modificar') {
           this.cargarExperiencia();
     }else{
             this.cargarformulario = true;
             this.experienciaForm = this.fb.group({
             empresa: ['', [ Validators.required]],
             puesto: ['', [ Validators.required]],
             descripcion: ['', [ Validators.required]],
             fecha_inicio: ['', [ Validators.required]],
             fecha_fin: ['', [ Validators.required]],
             estado: ['', [ Validators.required]],
             ciudad: ['', [ Validators.required]],
             pais: ['', [ Validators.required]],
             id_pais: [1 , [Validators.required, Validators.min(1)]],
             id_ciudad: [null , [Validators.required, Validators.min(1)]],
             id_tipo_contrato: [0, [ Validators.required, Validators.min(1)]],
             id_curriculum: [this.idCurriculum]
            });
             this.cargandoModal = false;
     }
  }
  cargarTipoContratos(): void {
    this.tipoContratoService.listar().subscribe((resp: TipoContrato[]) => {
      this.tipoContratos = resp;
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
      this.cargarCiudades(this.paises[0].id);
    });
  }
  cargarCiudades(idPais: number): void {
    this.ciudades = [];
    this.ubicacionService.listarCiudades(idPais).subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  cargarExperiencia(): void {
      this.experienciaService.buscar(this.idExperiencia)
      .subscribe((resp: ExperienciaLaboral) => {
        this.experiencia = resp;
        this.cargarCiudades(this.experiencia.ciudad.estado.pais.id);
        if ( this.experiencia.ciudad.estado.pais.id === 2 &&  this.experiencia.otraCiudad) {
          this.mostrarCampos = true;
          this.experienciaForm = this.fb.group({
            empresa: [this.experiencia.empresa, [ Validators.required]],
            puesto: [this.experiencia.puesto, [ Validators.required]],
            descripcion: [this.experiencia.descripcion, [ Validators.required]],
            fecha_inicio: [this.experiencia.fecha_inicio, [ Validators.required]],
            fecha_fin: [this.experiencia.fecha_fin, [ Validators.required]],
            pais: [this.experiencia.otraCiudad.pais , [Validators.required]],
            estado: [this.experiencia.otraCiudad.estado , [Validators.required]],
            ciudad: [ this.experiencia.otraCiudad.ciudad , [Validators.required]],
            id_pais: [this.experiencia.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]],
            id_ciudad: ['', [Validators.required, Validators.min(1)]],
            id_curriculum: [this.idCurriculum],
            id_tipo_contrato: [this.experiencia.tipo_contrato.id, [ Validators.required, Validators.min(1)]],
          });
          this.cargandoModal = false;
        }else {
          this.mostrarCampos = false;
          this.experienciaForm = this.fb.group({
            empresa: [this.experiencia.empresa, [ Validators.required]],
            puesto: [this.experiencia.puesto, [ Validators.required]],
            descripcion: [this.experiencia.descripcion, [ Validators.required]],
            fecha_inicio: [this.experiencia.fecha_inicio, [ Validators.required]],
            fecha_fin: [this.experiencia.fecha_fin, [ Validators.required]],
            pais: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            ciudad: [ '', [Validators.required]],
            id_pais: [this.experiencia.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]],
            id_ciudad: [this.experiencia.ciudad.id, [Validators.required, Validators.min(1)]],
            id_curriculum: [this.idCurriculum],
            id_tipo_contrato: [this.experiencia.tipo_contrato.id, [ Validators.required, Validators.min(1)]],
          });
          this.cargandoModal = false;
      }
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.experienciaForm.get(campo).invalid && this.experienciaForm.get(campo).touched) {
      return true;
    }else if (this.experienciaForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    if ( !this.mostrarCampos) {
      this.experienciaForm.get('ciudad').disable();
      this.experienciaForm.get('estado').disable();
      this.experienciaForm.get('pais').disable();
      this.experienciaForm.get('id_ciudad').enable();
      this.experienciaForm.value.ciudad = '';
      this.experienciaForm.value.estado = '';
      this.experienciaForm.value.pais = '';

    }else {
      this.experienciaForm.get('ciudad').enable();
      this.experienciaForm.get('estado').enable();
      this.experienciaForm.get('pais').enable();
      this.experienciaForm.get('id_ciudad').disable();
      this.experienciaForm.value.id_ciudad = this.ciudades[0].id;

    }
    if (this.experienciaForm.get('id_tipo_contrato').value === 0) {
      return;
    }
    if (this.experienciaForm.invalid) {
      return;
    }
    this.cargando = true;
    if (this.tipo === 'modificar') {
      this.experienciaService.modificar(this.experienciaForm.value, this.experiencia.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al modificar Experiencia', err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.experienciaService.adicionar(this.experienciaForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al adicionar experiencia laboral', err.error.mensaje, 'error');
          });
    }
  }
  cambiarPais(): void {
    const id = this.experienciaForm.get('id_pais').value;
    if(id === 2) {
      this.mostrarCampos = true;
      this.experienciaForm.get('ciudad').enable();
      this.experienciaForm.get('estado').enable();
      this.experienciaForm.get('pais').enable();
      this.experienciaForm.get('id_ciudad').disable();
    }else {
      this.mostrarCampos = false;
      this.experienciaForm.get('ciudad').disable();
      this.experienciaForm.get('estado').disable();
      this.experienciaForm.get('pais').disable();
      this.experienciaForm.get('id_ciudad').enable();
      this.experienciaForm.value.id_ciudad = this.ciudades[0].id;

    }
    this.cargarCiudades(parseInt(id));

  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienciaLaboralService } from '../../../../services/solicitante/curriculum/experiencia-laboral.service';
import { Pais } from '../../../../models/pais.model';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';
import { ExperienciaLaboral } from '../../../../models/curriculum/experiencia-laboral.model';
import { TipoContrato } from '../../../../models/empleador/tipo-contrato.model';
import { TipoContratoService } from '../../../../services/vacante/tipo-contrato.service';

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
  formSubmitted = false;
  experienciaForm: FormGroup;
  experiencia: ExperienciaLaboral;
  paises: Pais[];
  tipoContratos: TipoContrato[];

  constructor(
          private fb: FormBuilder,
          private experienciaService: ExperienciaLaboralService,
          private tipoContratoService: TipoContratoService,
          private ubicacionService: UbicacionService
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
             id_pais: [1, [ Validators.required, Validators.min(1)]],
             estado: ['', [ Validators.required]],
             ciudad: ['', [ Validators.required]],
             id_tipo_contrato: [0, [ Validators.required, Validators.min(1)]],
             id_curriculum: [this.idCurriculum]
            });
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
    });
  }
  cargarExperiencia(): void {
      this.experienciaService.buscar(this.idExperiencia)
      .subscribe((resp: ExperienciaLaboral) => {
        this.experiencia = resp;
        this.cargarformulario = true;
        this.experienciaForm = this.fb.group({
        empresa: [this.experiencia.empresa, [ Validators.required]],
        puesto: [this.experiencia.puesto, [ Validators.required]],
        descripcion: [this.experiencia.descripcion, [ Validators.required]],
        fecha_inicio: [this.experiencia.fecha_inicio, [ Validators.required]],
        fecha_fin: [this.experiencia.fecha_fin, [ Validators.required]],
        id_pais: [this.experiencia.pais.id, [ Validators.required, Validators.min(1)]],
        estado: [this.experiencia.estado, [ Validators.required]],
        ciudad: [this.experiencia.ciudad, [ Validators.required]],
        id_curriculum: [this.idCurriculum],
        id_tipo_contrato: [this.experiencia.tipo_contrato.id, [ Validators.required, Validators.min(1)]],

      });
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.experienciaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.experienciaForm.get('id_tipo_contrato').value === 0) {
      return;
    }
    if (this.experienciaForm.invalid) {
      return;
    }
    console.log(this.experienciaForm.value);
    if (this.tipo === 'modificar') {
      this.experienciaService.modificar(this.experienciaForm.value, this.experiencia.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Experiencia', err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.experienciaService.adicionar(this.experienciaForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar experiencia laboral', err.error.mensaje, 'error');
          });
    }
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstudioBasico } from '../../../../models/curriculum/estudio-basico.model';
import { EstudioBasicoService } from '../../../../services/solicitante/curriculum/estudio-basico.service';
import Swal from 'sweetalert2';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { GradoEscolarService } from '../../../../services/solicitante/curriculum/grado-escolar.service';
import { Pais } from '../../../../models/pais.model';
import { GradoEscolar } from '../../../../models/estudio/grado-escolar.model';

@Component({
  selector: 'app-formulario-estudio-basico',
  templateUrl: './formulario-estudio-basico.component.html',
  styles: [
  ]
})
export class FormularioEstudioBasicoComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() idEstudio: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  cargarformulario = false;
  formSubmitted = false;
  estudioForm: FormGroup;
  estudio: EstudioBasico;
  paises: Pais[];
  grados: GradoEscolar[];

  constructor(
          private fb: FormBuilder,
          private estudioService: EstudioBasicoService,
          private ubicacionService: UbicacionService,
          private gradoEscolarService: GradoEscolarService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarGrados();
    if (this.tipoOperacion === 'modificar') {
              this.cargarEstudio();
    }else{
          this.cargarformulario = true;
          this.estudioForm = this.fb.group({
          colegio: ['' , [Validators.required]],
          fecha_inicio: ['' , [Validators.required]],
          fecha_fin: ['' , [Validators.required]],
          estado: ['' , [Validators.required]],
          ciudad: ['' , [Validators.required]],
          id_pais: [1 , [Validators.required, Validators.min(1)]],
          id_grado_inicio: [0 , [Validators.required, Validators.min(1)]],
          id_grado_fin: [0 , [Validators.required, Validators.min(1)]],
          id_curriculum: [this.idCurriculum]
          });
    }
  }
  cargarGrados(): void {
    this.gradoEscolarService.listar().subscribe((resp: GradoEscolar[]) => {
      this.grados = resp;
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
    });
  }
  cargarEstudio(): void {
    this.estudioService.buscar(this.idEstudio)
      .subscribe((resp: EstudioBasico) => {
        this.estudio = resp;
        this.cargarformulario = true;
        this.estudioForm = this.fb.group({
          colegio: [ this.estudio.colegio , [Validators.required]],
          fecha_inicio: [ this.estudio.fecha_inicio , [Validators.required]],
          fecha_fin: [this.estudio.fecha_fin , [Validators.required]],
          estado: [ this.estudio.estado , [Validators.required]],
          ciudad: [ this.estudio.ciudad , [Validators.required]],
          id_pais: [this.estudio.pais.id , [Validators.required, Validators.min(1)]],
          id_grado_inicio: [this.estudio.grado_inicio.id , [Validators.required, Validators.min(1)]],
          id_grado_fin: [this.estudio.grado_fin.id , [Validators.required, Validators.min(1)]],
          id_curriculum: [this.idCurriculum]
      });
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.estudioForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.estudioForm.invalid) {
      return;
    }
    console.log(this.estudioForm.value);
    if (this.tipoOperacion === 'modificar') {
      this.estudioService.modificar(this.estudioForm.value, this.estudio.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Estudio Basico', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.estudioService.adicionar(this.estudioForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Estudio Basico', err.error.mensaje, 'error');
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

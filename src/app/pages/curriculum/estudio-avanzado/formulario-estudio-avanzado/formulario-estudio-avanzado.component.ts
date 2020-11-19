import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstudioAvanzado } from '../../../../models/curriculum/estudio-avanzado.model';
import { Pais } from '../../../../models/pais.model';
import { NivelEstudio } from '../../../../models/estudio/nivel-estudio.model';
import { EstudioAvanzadoService } from '../../../../services/solicitante/curriculum/estudio-avanzado.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { NivelEstudioService } from '../../../../services/solicitante/curriculum/nivel-estudio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-estudio-avanzado',
  templateUrl: './formulario-estudio-avanzado.component.html',
  styles: [
  ]
})
export class FormularioEstudioAvanzadoComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() idEstudio: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  cargarformulario = false;
  formSubmitted = false;
  estudioForm: FormGroup;
  estudio: EstudioAvanzado;
  paises: Pais[];
  niveles: NivelEstudio[];

  constructor(
          private fb: FormBuilder,
          private estudioService: EstudioAvanzadoService,
          private ubicacionService: UbicacionService,
          private nivelEstudioService: NivelEstudioService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarNiveles();

    if (this.tipoOperacion === 'modificar') {
          this.cargarEstudio();
    }else{
          this.cargarformulario = true;
          this.estudioForm = this.fb.group({
          institucion: ['' , [Validators.required]],
          carrera: ['' , [Validators.required]],
          fecha_inicio: ['' , [Validators.required]],
          fecha_fin: ['' , [Validators.required]],
          estado: ['' , [Validators.required]],
          ciudad: ['' , [Validators.required]],
          id_pais: [1 , [Validators.required, Validators.min(1)]],
          id_nivel_estudio: [0 , [Validators.required, Validators.min(1)]],
          id_curriculum: [this.idCurriculum]
          });
    }
  }
  cargarNiveles(): void {
    this.nivelEstudioService.listar().subscribe((resp: NivelEstudio[]) => {
      this.niveles = resp;
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
    });
  }
  cargarEstudio(): void {
    console.log(this.idEstudio);
    this.estudioService.buscar(this.idEstudio)
      .subscribe((resp: EstudioAvanzado) => {
        this.estudio = resp;
        this.cargarformulario = true;
        this.estudioForm = this.fb.group({
          institucion: [this.estudio.institucion , [Validators.required]],
          carrera: [this.estudio.carrera , [Validators.required]],
          fecha_inicio: [ this.estudio.fecha_inicio , [Validators.required]],
          fecha_fin: [this.estudio.fecha_fin , [Validators.required]],
          estado: [ this.estudio.estado , [Validators.required]],
          ciudad: [ this.estudio.ciudad , [Validators.required]],
          id_pais: [this.estudio.pais.id , [Validators.required, Validators.min(1)]],
          id_nivel_estudio: [this.estudio.nivel_estudio.id , [Validators.required, Validators.min(1)]],
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
            Swal.fire('Error al modificar Estudio Avanzado', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.estudioService.adicionar(this.estudioForm.value)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Estudio Avanzado', err.error.mensaje, 'error');
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Habilidad } from '../../../../../models/curriculum/habilidad.model';
import { HabilidadService } from '../../../../../services/solicitante/curriculum/habilidad.service';
import Swal from 'sweetalert2';
import { CurriculumHabilidad } from '../../../../../models/curriculum/curriculum-habilidad.model';

@Component({
  selector: 'app-formulario-habilidad',
  templateUrl: './formulario-habilidad.component.html',
  styles: [
  ]
})
export class FormularioHabilidadComponent implements OnInit {
  @Input() visible: boolean;
  @Input() id_curriculum: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();


  cargarformulario = false;
  formSubmitted = false;
  habilidadForm: FormGroup;
  curriculum_habilidad: CurriculumHabilidad;
  habilidades: Habilidad[];
  cargandoModal = true;
  cargando = false;
  constructor(
          private fb: FormBuilder,
          private habilidadService: HabilidadService
    ) { }

  ngOnInit(): void {
    this.cargarHabilidades();
    this.cargarformulario = true;
    this.habilidadForm = this.fb.group({
      id_habilidad: [ null , [Validators.required]],
      id_curriculum: [this.id_curriculum]
    });
    this.cargandoModal = false;
  }
  cargarHabilidades(): void {
    this.habilidadService.listarTodas(this.id_curriculum).subscribe(({habilidades}) => {
      console.log(habilidades);
      this.habilidades = habilidades;
    });
  }
  selectNoValido( campo: string): boolean {
    const id = this.habilidadForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.habilidadForm.get('id_habilidad').value === 0) {
      return;
    }
    if (this.habilidadForm.invalid) {
      return;
    }
    this.cargando = true;
    this.habilidadService.adicionar(this.habilidadForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cerrarModal();
        }, (err) => {
          console.log(err);
          this.cargando = false;
          Swal.fire('Error al adicionar Habilidad', err.error.mensaje, 'error');
        });
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }
  cancelarModal() {
    this.cancelar.emit(false);
  }

}

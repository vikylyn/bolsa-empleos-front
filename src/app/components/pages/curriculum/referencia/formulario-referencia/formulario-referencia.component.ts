import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referencia } from '../../../../../models/curriculum/referencia.model';
import { ReferenciaService } from '../../../../../services/solicitante/curriculum/referencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-referencia',
  templateUrl: './formulario-referencia.component.html',
  styles: [
  ]
})
export class FormularioReferenciaComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() idReferencia: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  cargandoModal = true;
  cargando = false;
  formSubmitted = false;
  referenciaForm: FormGroup;
  referencia: Referencia;

  constructor(
          private fb: FormBuilder,
          private referenciaService: ReferenciaService
    ) { }

  ngOnInit(): void {
        if (this.tipoOperacion === 'modificar') {
              this.cargarReferencia();
        }else{
              this.referenciaForm = this.fb.group({
              nombre: ['' , [Validators.required]],
              apellidos: ['' , [Validators.required]],
              empresa: ['' , [Validators.required]],
              cargo: ['' , [Validators.required]],
              telefono: ['' , [Validators.required]],
              id_curriculum: [this.idCurriculum]
        });
              this.cargandoModal = false;
      }
  }

  cargarReferencia(): void {
      this.referenciaService.buscar(this.idReferencia)
      .subscribe((resp: Referencia) => {
        console.log(resp);
        this.referencia = resp;
        this.referenciaForm = this.fb.group({
        nombre: [this.referencia.nombre , [Validators.required]],
        apellidos: [this.referencia.apellidos , [Validators.required]],
        empresa: [this.referencia.empresa , [Validators.required]],
        cargo: [this.referencia.cargo , [Validators.required]],
        telefono: [this.referencia.telefono , [Validators.required]],
        id_curriculum: [this.idCurriculum]
      });
        this.cargandoModal = false;
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.referenciaForm.get(campo).invalid && this.referenciaForm.get(campo).touched) {
      return true;
    }else if (this.referenciaForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.referenciaForm.invalid) {
      return;
    }
    this.cargando = true;
    if (this.tipoOperacion === 'modificar') {
      this.referenciaService.modificar(this.referenciaForm.value, this.referencia.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al modificar Referencia', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.referenciaService.adicionar(this.referenciaForm.value)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al adicionar Referencia', err.error.mensaje, 'error');
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

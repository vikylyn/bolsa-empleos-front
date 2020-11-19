import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solicitante } from '../../../../models/solicitante/solicitante.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Curriculum } from 'src/app/models/curriculum/curriculum.model';
import { CurriculumService } from '../../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-encabezado',
  templateUrl: './formulario-encabezado.component.html',
})
export class FormularioEncabezadoComponent implements OnInit {

  @Input() visible: boolean;
  @Input() aleatorio: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  cargarFormulario = false;
  solicitante: Solicitante;
  public formSubmitted = false;
  public curriculumForm: FormGroup;
  public curriculum: Curriculum;



  constructor(private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router,
              private fb: FormBuilder) { }


  ngOnInit(): void {
    console.log('aleatorio' , this.aleatorio);
    this.solicitante = this.loginService.solicitante;
    this.curriculumService.buscarPorIdSolicitante(this.solicitante.id).subscribe((resp: any) => {
        if (resp.ok === false) {
          this.router.navigateByUrl('/curriculum');
        }else {
          this.curriculum = resp.curriculum;
          this.cargarCurriculum();
        }
    });

  }
  cargarCurriculum(): void {
    this.cargarFormulario = true;
    this.curriculumForm = this.fb.group({
      titulo: [this.curriculum.titulo, [ Validators.required]],
      pretension_salarial: [this.curriculum.pretension_salarial, [Validators.required]],
      biografia: [this.curriculum.biografia, [Validators.required]],
      id_solicitante: [this.loginService.solicitante.id, [Validators.required]]
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.curriculumForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  guardar(): void{
    this.formSubmitted = true;
    if (this.curriculumForm.invalid) {
      return;
    }
    this.curriculumService.modificar(this.curriculum.id, this.curriculumForm.value)
    .subscribe((resp: any) => {
      console.log(resp);
      Swal.fire(resp.mensaje, '', 'success');
      this.cerrarModal();
     // this.router.navigateByUrl('/curriculum/administracion');
    }, (err) => {
      console.log(err);
      Swal.fire('Error al modificar Curriculum', err.error.error || err.error.mensaje || err.error.errors[0].msg, 'error');
    });
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }
  cancelarModal() {
    this.cancelar.emit(false);
  }
}

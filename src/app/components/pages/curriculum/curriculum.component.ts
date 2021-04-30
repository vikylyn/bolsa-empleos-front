import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Curriculum } from '../../../models/curriculum/curriculum.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { Solicitante } from '../../../models/solicitante/solicitante.model';
import { ValidacionFormularioService } from '../../../services/validacion-formulario.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styles: [
  ]
})
export class CurriculumComponent implements OnInit {
  cargarFormulario = false;
  solicitante: Solicitante;
  public formSubmitted = false;
  public curriculumForm: FormGroup;
  public curriculum: Curriculum;
  public cargando = false;

  constructor(private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router,
              public validacionService: ValidacionFormularioService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.solicitante = this.loginService.solicitante;
    this.curriculumService.buscarPorIdSolicitante(this.solicitante.id).subscribe((resp: any) => {
        if (resp.ok === false) {
          this.cargarFormulario = false;
        }else {
         this.router.navigateByUrl('/curriculum/administracion');

        }
    });

  }
  agregarCurriculum(): void {
    this.cargando = true;
    this.cargarFormulario = true;
    this.curriculumForm = this.fb.group({
      titulo: ['', [ Validators.required]],
      pretension_salarial: ['', [Validators.required]],
      biografia: ['', [Validators.required]],
      id_solicitante: [this.loginService.solicitante.id, [Validators.required]]
    });
    this.cargando = false;
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
    this.cargando  = true;
    this.curriculumService.adicionar(this.curriculumForm.value)
    .subscribe((resp: any) => {
      this.cargando = false;
      Swal.fire(resp.mensaje, '', 'success');
      this.router.navigateByUrl('/curriculum/administracion');
    }, (err) => {
      console.log(err);
      this.cargando = false;
      Swal.fire('Error al adicionar Curriculum', err.error.error || err.error.mensaje || err.error.errors[0].msg, 'error');
    });
  }
}

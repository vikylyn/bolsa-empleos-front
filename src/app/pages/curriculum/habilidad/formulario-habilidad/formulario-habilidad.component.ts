import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Habilidad } from '../../../../models/curriculum/habilidad.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HabilidadService } from '../../../../services/solicitante/curriculum/habilidad.service';
import Swal from 'sweetalert2';
import { CurriculumHabilidad } from '../../../../models/curriculum/curriculum-habilidad.model';

@Component({
  selector: 'app-formulario-habilidad',
  templateUrl: './formulario-habilidad.component.html',
  styles: [
  ]
})
export class FormularioHabilidadComponent implements OnInit {
  cargarformulario = false;
  formSubmitted = false;
  habilidadForm: FormGroup;
  curriculum_habilidad: CurriculumHabilidad;
  habilidades: Habilidad[];
  id_curriculum: number;
  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private habilidadService: HabilidadService
    ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
        this.id_curriculum = params.id_curriculum;
        this.cargarHabilidades();
        this.cargarformulario = true;
        this.habilidadForm = this.fb.group({
          id_habilidad: [ null , [Validators.required]],
          id_curriculum: [this.id_curriculum]
        });
    });
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
    console.log(this.habilidadForm.value);
    this.habilidadService.adicionar(this.habilidadForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire(resp.mensaje, '', 'success');
          this.router.navigateByUrl('/curriculum/habilidad');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al adicionar Habilidad', err.error.mensaje, 'error');
        });
  }

}

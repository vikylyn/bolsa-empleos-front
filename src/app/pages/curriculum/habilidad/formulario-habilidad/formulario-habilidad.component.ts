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
  tipo: string;
  id: number;
  id_curriculum: number;
  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private habilidadService: HabilidadService
    ) { }

  ngOnInit(): void {
    this.cargarHabilidades();
    this.route.queryParams
    .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        this.id_curriculum = params.id_curriculum;
        if (params.tipo === 'modificar') {
              this.cargarHabilidad(params);
        }else{
              this.cargarformulario = true;
              this.habilidadForm = this.fb.group({
              id_habilidad: [0 , [Validators.required]],
              id_curriculum: [this.id_curriculum]
        });
      }
    });
  }
  cargarHabilidades(): void {
    this.habilidadService.listarTodas().subscribe(({habilidades}) => {
      this.habilidades = habilidades;
    });
  }
  cargarHabilidad(params: any): void {
      this.habilidadService.buscar(params.id)
      .subscribe((resp: CurriculumHabilidad) => {
        this.curriculum_habilidad = resp;
        this.cargarformulario = true;
        this.habilidadForm = this.fb.group({
        id_habilidad: [this.curriculum_habilidad.habilidad.id , [Validators.required]],
        id_curriculum: [this.id_curriculum]
      });
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.habilidadForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
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
    if (this.tipo === 'modificar') {
      this.habilidadService.modificar(this.habilidadForm.value, this.curriculum_habilidad.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/habilidad');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Habilidad', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
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

}

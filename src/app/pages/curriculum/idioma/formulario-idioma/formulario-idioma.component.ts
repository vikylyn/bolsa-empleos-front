import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurriculumIdioma } from '../../../../models/curriculum/curriculum-idioma.model';
import { Idioma } from '../../../../models/idioma/idioma.model';
import { NivelIdioma } from '../../../../models/idioma/nivel-idioma.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IdiomaService } from '../../../../services/solicitante/curriculum/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-idioma',
  templateUrl: './formulario-idioma.component.html',
  styles: [
  ]
})
export class FormularioIdiomaComponent implements OnInit {

  cargarformulario = false;
  formSubmitted = false;
  idiomaForm: FormGroup;
  curriculum_idioma: CurriculumIdioma;
  idiomas: Idioma[];
  niveles: NivelIdioma[];
  tipo: string;
  id: number;
  id_curriculum: number;
  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private idiomaService: IdiomaService
    ) { }

  ngOnInit(): void {
    this.cargarIdiomas();
    this.cargarNiveles();
    this.route.queryParams
    .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        this.id_curriculum = params.id_curriculum;
        if (params.tipo === 'modificar') {
              this.cargarIdioma(params);
        }else{
              this.cargarformulario = true;
              this.idiomaForm = this.fb.group({
              id_curriculum: [this.id_curriculum],
              id_idioma: [0 , [Validators.required]],
              id_nivel_escrito: [0 , [Validators.required]],
              id_nivel_oral: [0 , [Validators.required]],
              id_nivel_lectura: [0 , [Validators.required]]
        });
      }
    });
  }
  cargarIdiomas(): void {
    this.idiomaService.listarIdiomas().subscribe(({idiomas}) => {
      this.idiomas = idiomas;
    });
  }
  cargarNiveles(): void {
    this.idiomaService.listarNiveles().subscribe(({niveles_idioma}) => {
      this.niveles = niveles_idioma;
    });
  }
  cargarIdioma(params: any): void {
      this.idiomaService.buscar(params.id)
      .subscribe((resp: CurriculumIdioma) => {
        this.curriculum_idioma = resp;
        this.cargarformulario = true;
        this.idiomaForm = this.fb.group({
          id_curriculum: [this.id_curriculum],
          id_idioma: [this.curriculum_idioma.idioma.id , [Validators.required]],
          id_nivel_escrito: [this.curriculum_idioma.nivel_escrito.id , [Validators.required]],
          id_nivel_oral: [this.curriculum_idioma.nivel_oral.id , [Validators.required]],
          id_nivel_lectura: [this.curriculum_idioma.nivel_lectura.id , [Validators.required]]
      });
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.idiomaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
  }
  selectNoValido( campo: string): boolean {
    const id = this.idiomaForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.idiomaForm.get('id_curriculum').value === 0 || this.idiomaForm.get('id_idioma').value === 0 || this.idiomaForm.get('id_nivel_escrito').value === 0 || this.idiomaForm.get('id_nivel_oral').value === 0 || this.idiomaForm.get('id_nivel_lectura').value === 0) {
      return;
    }
    if (this.idiomaForm.invalid) {
      return;
    }
    console.log(this.idiomaForm.value);
    if (this.tipo === 'modificar') {
      this.idiomaService.modificar(this.idiomaForm.value, this.curriculum_idioma.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/idioma');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Idioma', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.idiomaService.adicionar(this.idiomaForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/idioma');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Idioma', err.error.mensaje, 'error');
          });
    }
  }


}

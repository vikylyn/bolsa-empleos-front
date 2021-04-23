import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurriculumIdioma } from '../../../../../models/curriculum/curriculum-idioma.model';
import { Idioma } from '../../../../../models/idioma/idioma.model';
import { NivelIdioma } from '../../../../../models/idioma/nivel-idioma.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IdiomaService } from '../../../../../services/solicitante/curriculum/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-idioma',
  templateUrl: './formulario-idioma.component.html',
  styles: [
  ]
})
export class FormularioIdiomaComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() idIdioma: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  cargando = false;
  cargandoModal = true;
  formSubmitted = false;
  idiomaForm: FormGroup;
  curriculumIdioma: CurriculumIdioma;
  idiomas: Idioma[];
  niveles: NivelIdioma[];

  constructor(
          private route: ActivatedRoute,
          private fb: FormBuilder,
          private idiomaService: IdiomaService
    ) { }

  ngOnInit(): void {
    this.cargarNiveles();

    if ( this.tipoOperacion === 'modificar') {
          this.cargarIdioma();
          this.cargarIdiomas();

    }else{
          this.cargarIdiomasNoAsignados();
          this.idiomaForm = this.fb.group({
          id_curriculum: [this.idCurriculum],
          id_idioma: [0 , [Validators.required, Validators.min(1)]],
          id_nivel_escrito: [0 , [Validators.required, Validators.min(1)]],
          id_nivel_oral: [0 , [Validators.required, Validators.min(1)]],
          id_nivel_lectura: [0 , [Validators.required, Validators.min(1)]]
        });
          this.cargandoModal = false;
    }
  }
  cargarIdiomas(): void {
    this.idiomaService.listarIdiomas().subscribe(({idiomas}) => {
      this.idiomas = idiomas;
    });
  }
  cargarIdiomasNoAsignados(): void {
    this.idiomaService.listarIdiomasNoAsigandos(this.idCurriculum).subscribe(({idiomas}) => {
      this.idiomas = idiomas;
    });
  }
  cargarNiveles(): void {
    this.idiomaService.listarNiveles().subscribe(({niveles_idioma}) => {
      this.niveles = niveles_idioma;
    });
  }
  cargarIdioma(): void {
      this.idiomaService.buscar(this.idIdioma)
      .subscribe((resp: CurriculumIdioma) => {
        this.curriculumIdioma = resp;
        this.idiomaForm = this.fb.group({
          id_curriculum: [this.idCurriculum],
          id_idioma: [this.curriculumIdioma.idioma.id , [Validators.required, Validators.min(1)]],
          id_nivel_escrito: [this.curriculumIdioma.nivel_escrito.id , [Validators.required, Validators.min(1)]],
          id_nivel_oral: [this.curriculumIdioma.nivel_oral.id , [Validators.required, Validators.min(1)]],
          id_nivel_lectura: [this.curriculumIdioma.nivel_lectura.id , [Validators.required, Validators.min(1)]]
      });
        this.cargandoModal = false;
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.idiomaForm.get(campo).invalid && this.idiomaForm.get(campo).touched) {
      return true;
    }else if (this.idiomaForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.idiomaForm.invalid) {
      return;
    }
    this.cargando = true;
    if (this.tipoOperacion === 'modificar') {
      this.idiomaService.modificar(this.idiomaForm.value, this.curriculumIdioma.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al modificar Idioma', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.idiomaService.adicionar(this.idiomaForm.value)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al adicionar Idioma', err.error.mensaje, 'error');
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

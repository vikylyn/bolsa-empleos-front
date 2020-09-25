import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstudioAvanzado } from '../../../../models/curriculum/estudio-avanzado.model';
import { Pais } from '../../../../models/pais.model';
import { NivelEstudio } from '../../../../models/estudio/nivel-estudio.model';
import { ActivatedRoute, Router } from '@angular/router';
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

  cargarformulario = false;
  formSubmitted = false;
  estudioForm: FormGroup;
  estudio: EstudioAvanzado;
  tipo: string;
  id: number;
  id_curriculum: number;
  paises: Pais[];
  niveles: NivelEstudio[];

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private estudioService: EstudioAvanzadoService,
          private ubicacionService: UbicacionService,
          private nivelEstudioService: NivelEstudioService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarNiveles();
    this.route.queryParams
    .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        this.id_curriculum = params.id_curriculum;
        if (params.tipo === 'modificar') {
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
              id_pais: [0 , [Validators.required]],
              id_nivel_estudio: [0 , [Validators.required]],
              id_curriculum: [this.id_curriculum]
        });
      }
    });
  }
  cargarNiveles(): void {
    this.nivelEstudioService.listar().subscribe((resp: NivelEstudio[]) => {
      this.niveles = resp;
      console.log(resp);
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
    });
  }
  cargarEstudio(): void {
    console.log(this.id);
    this.estudioService.buscar(this.id)
      .subscribe((resp: EstudioAvanzado) => {
        this.estudio = resp;
        console.log(this.estudio);
        this.cargarformulario = true;
        this.estudioForm = this.fb.group({
          institucion: [this.estudio.institucion , [Validators.required]],
          carrera: [this.estudio.carrera , [Validators.required]],
          fecha_inicio: [ this.estudio.fecha_inicio , [Validators.required]],
          fecha_fin: [this.estudio.fecha_fin , [Validators.required]],
          estado: [ this.estudio.estado , [Validators.required]],
          ciudad: [ this.estudio.ciudad , [Validators.required]],
          id_pais: [this.estudio.pais.id , [Validators.required]],
          id_nivel_estudio: [this.estudio.nivel_estudio.id , [Validators.required]],
          id_curriculum: [this.id_curriculum]
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
  selectNoValido( campo: string): boolean {
    const id = this.estudioForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
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
    if (this.estudioForm.get('id_pais').value === 0 || this.estudioForm.get('id_nivel_estudio').value === 0) {
      return;
    }
    console.log(this.estudioForm.value);
    if (this.tipo === 'modificar') {
      this.estudioService.modificar(this.estudioForm.value, this.estudio.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/estudio-avanzado');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Estudio Avanzado', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.estudioService.adicionar(this.estudioForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/estudio-avanzado');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Estudio Avanzado', err.error.mensaje, 'error');
          });
    }
  }

}

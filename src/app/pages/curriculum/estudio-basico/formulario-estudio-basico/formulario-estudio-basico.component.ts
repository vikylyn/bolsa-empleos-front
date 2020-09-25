import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstudioBasico } from '../../../../models/curriculum/estudio-basico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudioBasicoService } from '../../../../services/solicitante/curriculum/estudio-basico.service';
import Swal from 'sweetalert2';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { GradoEscolarService } from '../../../../services/solicitante/curriculum/grado-escolar.service';
import { Pais } from '../../../../models/pais.model';
import { GradoEscolar } from '../../../../models/estudio/grado-escolar.model';

@Component({
  selector: 'app-formulario-estudio-basico',
  templateUrl: './formulario-estudio-basico.component.html',
  styles: [
  ]
})
export class FormularioEstudioBasicoComponent implements OnInit {

  cargarformulario = false;
  formSubmitted = false;
  estudioForm: FormGroup;
  estudio: EstudioBasico;
  tipo: string;
  id: number;
  id_curriculum: number;
  paises: Pais[];
  grados: GradoEscolar[];

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private estudioService: EstudioBasicoService,
          private ubicacionService: UbicacionService,
          private gradoEscolarService: GradoEscolarService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarGrados();
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
              colegio: ['' , [Validators.required]],
              fecha_inicio: ['' , [Validators.required]],
              fecha_fin: ['' , [Validators.required]],
              estado: ['' , [Validators.required]],
              ciudad: ['' , [Validators.required]],
              id_pais: [0 , [Validators.required]],
              id_grado_inicio: [0 , [Validators.required]],
              id_grado_fin: [0 , [Validators.required]],
              id_curriculum: [this.id_curriculum]
        });
      }
    });
  }
  cargarGrados(): void {
    this.gradoEscolarService.listar().subscribe((resp: GradoEscolar[]) => {
      this.grados = resp;
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
      .subscribe((resp: EstudioBasico) => {
        this.estudio = resp;
        console.log(this.estudio);
        this.cargarformulario = true;
        this.estudioForm = this.fb.group({
          colegio: [ this.estudio.colegio , [Validators.required]],
          fecha_inicio: [ this.estudio.fecha_inicio , [Validators.required]],
          fecha_fin: [this.estudio.fecha_fin , [Validators.required]],
          estado: [ this.estudio.estado , [Validators.required]],
          ciudad: [ this.estudio.ciudad , [Validators.required]],
          id_pais: [this.estudio.pais.id , [Validators.required]],
          id_grado_inicio: [this.estudio.grado_inicio.id , [Validators.required]],
          id_grado_fin: [this.estudio.grado_fin.id , [Validators.required]],
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
    if (this.estudioForm.get('id_pais').value === 0 || this.estudioForm.get('id_grado_inicio').value === 0 || this.estudioForm.get('id_grado_fin').value === 0) {
      return;
    }
    console.log(this.estudioForm.value);
    if (this.tipo === 'modificar') {
      this.estudioService.modificar(this.estudioForm.value, this.estudio.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/estudio-basico');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Estudio Basico', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.estudioService.adicionar(this.estudioForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/estudio-basico');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Estudio Basico', err.error.mensaje, 'error');
          });
    }
  }

}

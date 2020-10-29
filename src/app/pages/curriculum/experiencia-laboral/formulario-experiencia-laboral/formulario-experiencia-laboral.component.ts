import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaLaboralService } from '../../../../services/solicitante/curriculum/experiencia-laboral.service';
import { GrupoOcupacional } from '../../../../models/ocupacion/grupo-ocupacional.model';
import { Pais } from '../../../../models/pais.model';
import { GrupoOcupacionalService } from '../../../../services/administrador/grupo-ocupacional.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';
import { ExperienciaLaboral } from '../../../../models/curriculum/experiencia-laboral.model';
import { TipoContrato } from '../../../../models/empleador/tipo-contrato.model';
import { TipoContratoService } from '../../../../services/vacante/tipo-contrato.service';

@Component({
  selector: 'app-formulario-experiencia-laboral',
  templateUrl: './formulario-experiencia-laboral.component.html',
  styles: [
  ]
})
export class FormularioExperienciaLaboralComponent implements OnInit {
  cargarformulario = false;
  formSubmitted = false;
  experienciaForm: FormGroup;
  experiencia: ExperienciaLaboral;
  tipo: string;
  id: number;
  id_curriculum: number;
  paises: Pais[];
  tipo_contratos: TipoContrato[];

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private experienciaService: ExperienciaLaboralService,
          private grupoService: GrupoOcupacionalService,
          private tipoContratoService: TipoContratoService,
          private ubicacionService: UbicacionService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarTipoContratos();
    this.route.queryParams
    .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        this.id_curriculum = params.id_curriculum;
        if (params.tipo === 'modificar') {
              this.cargarExperiencia(params);
        }else{
              this.cargarformulario = true;
              this.experienciaForm = this.fb.group({
              empresa: ['', [ Validators.required]],
              puesto: ['', [ Validators.required]],
              descripcion: ['', [ Validators.required]],
              fecha_inicio: ['', [ Validators.required]],
              fecha_fin: ['', [ Validators.required]],
              id_pais: [0, [ Validators.required]],
              estado: ['', [ Validators.required]],
              ciudad: ['', [ Validators.required]],
              id_tipo_contrato: [0, [ Validators.required]],
          //    id_grupo_ocupacional: [0 , [Validators.required]],
              id_curriculum: [this.id_curriculum]
        });
      }
    });
  }
  cargarTipoContratos(): void {
    this.tipoContratoService.listar().subscribe((resp: TipoContrato[]) => {
      this.tipo_contratos = resp;
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
    });
  }
  cargarExperiencia(params: any): void {
      this.experienciaService.buscar(params.id)
      .subscribe((resp: ExperienciaLaboral) => {
        this.experiencia = resp;
        this.cargarformulario = true;
        this.experienciaForm = this.fb.group({
        empresa: [this.experiencia.empresa, [ Validators.required]],
        puesto: [this.experiencia.puesto, [ Validators.required]],
        descripcion: [this.experiencia.descripcion, [ Validators.required]],
        fecha_inicio: [this.experiencia.fecha_inicio, [ Validators.required]],
        fecha_fin: [this.experiencia.fecha_fin, [ Validators.required]],
        id_pais: [this.experiencia.pais.id, [ Validators.required]],
        estado: [this.experiencia.estado, [ Validators.required]],
        ciudad: [this.experiencia.ciudad, [ Validators.required]],
   //     id_grupo_ocupacional: [resp.grupo_ocupacional.id , [Validators.required]],
        id_curriculum: [this.id_curriculum],
        id_tipo_contrato: [this.experiencia.tipo_contrato.id, [ Validators.required]],

      });
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.experienciaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
  }
  selectNoValido( campo: string): boolean {
    const id = this.experienciaForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.experienciaForm.get('id_tipo_contrato').value === 0) {
      return;
    }
    if (this.experienciaForm.invalid) {
      return;
    }
    console.log(this.experienciaForm.value);
    if (this.tipo === 'modificar') {
      this.experienciaService.modificar(this.experienciaForm.value, this.experiencia.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/experiencia-laboral');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Experiencia', err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.experienciaService.adicionar(this.experienciaForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/experiencia-laboral');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar experiencia laboral', err.error.mensaje, 'error');
          });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profesion } from '../../../models/profesion/profesion.model';
import { ProfesionService } from '../../../services/administrador/profesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { AreaLaboralService } from '../../../services/administrador/area-laboral.service';
import { ActividadLaboralService } from '../../../services/administrador/actividad-laboral.service';
import { AreaLaboral } from '../../../models/profesion/area-laboral.model';
import { ActividadLaboral } from '../../../models/profesion/actividad-laboral.model';

@Component({
  selector: 'app-formulario-profesion',
  templateUrl: './formulario-profesion.component.html',
  styles: [
  ]
})
export class FormularioProfesionComponent implements OnInit {

  cargarformulario = false;
  public formSubmitted = false;
  public profesionForm: FormGroup;
  public profesion: Profesion;
  public tipo: string;
  public id: number;
  areas_laborales: AreaLaboral[];
  actividades_laborales: ActividadLaboral[];

  constructor(public profesionService: ProfesionService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              public areaService: AreaLaboralService,
              public actividadService: ActividadLaboralService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        if (params.tipo === 'modificar') {
          this.cargarProfesion(params);
        }else{
          this.cargarformulario = true;
          this.profesionForm = this.fb.group({
          nombre: ['', [ Validators.required]],
          habilitado: [true, Validators.required],
          id_area_laboral: [0, [Validators.required]],
          id_actividad_laboral: [0, [Validators.required]],
          id_administrador: [this.loginService.administrador.id, [Validators.required]],
          });
        }
      });
    this.cargarAreas();
    this.cargarActividades();
  }
  cargarAreas(): void {
    this.areaService.listarTodas().subscribe( (resp: AreaLaboral[]) => {
      this.areas_laborales = resp;
    });
  }
  cargarActividades(): void {
    this.actividadService.listar().subscribe( (resp: ActividadLaboral[]) => {
      this.actividades_laborales = resp;
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.profesionForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  selectNoValido( campo: string): boolean {
    const id = this.profesionForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  cargarProfesion(params: any): void {
    this.profesionService.buscar(params.id)
    .subscribe((resp: any) => {
      this.profesion = resp;
      this.cargarformulario = true;
      this.profesionForm = this.fb.group({
      nombre: [this.profesion.nombre, [ Validators.required]],
      habilitado: [this.profesion.habilitado, Validators.required],
      id_area_laboral: [this.profesion.area_laboral.id, [Validators.required]],
      id_actividad_laboral: [this.profesion.actividad_laboral.id, [Validators.required]],
      id_administrador: [this.loginService.administrador.id, [Validators.required]],
      id: [this.id, [Validators.required]]
    });
  });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.profesionForm.get('id_actividad_laboral').value === 0 || this.profesionForm.get('id_area_laboral').value === 0) {
      return;
    }
    if (this.profesionForm.invalid) {
      return;
    }
    console.log(this.profesionForm.value);
    if (this.tipo === 'modificar') {
      this.profesionService.modificar(this.profesionForm.value, this.profesion.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/profesion');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Administrador', err.error.mensaje, 'error');
          });
    }else {
      this.profesionService.adicionar(this.profesionForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/profesion');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar profesion', err.error.mensaje, 'error');
          });
    }
  }

}

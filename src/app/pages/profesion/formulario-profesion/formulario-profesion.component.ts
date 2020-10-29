import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ocupacion } from '../../../models/ocupacion/ocupacion.model';
import { OcupacionService } from '../../../services/administrador/ocupacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { GrupoOcupacionalService } from '../../../services/administrador/grupo-ocupacional.service';
import { GrupoOcupacional } from '../../../models/ocupacion/grupo-ocupacional.model';

@Component({
  selector: 'app-formulario-profesion',
  templateUrl: './formulario-profesion.component.html',
  styles: [
  ]
})
export class FormularioProfesionComponent implements OnInit {

  cargarformulario = false;
  public formSubmitted = false;
  public ocupacionForm: FormGroup;
  public ocupacion: Ocupacion;
  public tipo: string;
  public id: number;
  grupos_ocupacionales: GrupoOcupacional[];

  constructor(public ocupacionService: OcupacionService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              public grupoService: GrupoOcupacionalService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        if (params.tipo === 'modificar') {
          this.cargarOcupacion(params);
        }else{
          this.cargarformulario = true;
          this.ocupacionForm = this.fb.group({
          nombre: ['', [ Validators.required]],
          habilitado: [true, Validators.required],
          id_grupo_ocupacional: [0, [Validators.required]],
          id_administrador: [this.loginService.administrador.id, [Validators.required]],
          });
        }
      });
    this.cargarGruposOcupacionales();
  }
  cargarGruposOcupacionales(): void {
    this.grupoService.listarTodas().subscribe( (resp: GrupoOcupacional[]) => {
      this.grupos_ocupacionales = resp;
    });
  }

  campoNoValido( campo: string): boolean {
    if (this.ocupacionForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  selectNoValido( campo: string): boolean {
    const id = this.ocupacionForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  cargarOcupacion(params: any): void {
    this.ocupacionService.buscar(params.id)
    .subscribe((resp: any) => {
      this.ocupacion = resp;
      console.log('respuesta', resp);
      this.cargarformulario = true;
      this.ocupacionForm = this.fb.group({
      nombre: [this.ocupacion.nombre, [ Validators.required]],
      habilitado: [this.ocupacion.habilitado, Validators.required],
      id_grupo_ocupacional: [this.ocupacion.grupo_ocupacional.id, [Validators.required]],
      id_administrador: [this.loginService.administrador.id, [Validators.required]],
      id: [this.id, [Validators.required]]
    });
  });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.ocupacionForm.get('id_grupo_ocupacional').value === 0) {
      return;
    }
    if (this.ocupacionForm.invalid) {
      return;
    }
    console.log(this.ocupacionForm.value);
    if (this.tipo === 'modificar') {
      this.ocupacionService.modificar(this.ocupacionForm.value, this.ocupacion.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/profesion');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Ocupacion', err.error.mensaje, 'error');
          });
    }else {
      this.ocupacionService.adicionar(this.ocupacionForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/profesion');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Ocupacion', err.error.mensaje, 'error');
          });
    }
  }

}

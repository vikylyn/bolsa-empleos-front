import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrupoOcupacionalService } from '../../../services/administrador/grupo-ocupacional.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoOcupacional } from '../../../models/ocupacion/grupo-ocupacional.model';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-area',
  templateUrl: './formulario-area.component.html',
  styles: [
  ]
})
export class FormularioAreaComponent implements OnInit {
  cargarformulario = false;
  public formSubmitted = false;
  public areaForm: FormGroup;
  public area: GrupoOcupacional;
  public tipo: string;
  public id: number;
  constructor(public grupoService: GrupoOcupacionalService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        if (params.tipo === 'modificar') {
          this.cargarArea(params);
          this.tipo = params.tipo;
          this.id = params.id;
        }else{
          this.tipo = params.tipo;
          this.id = params.id;
          this.cargarformulario = true;
          this.areaForm = this.fb.group({
          nombre: ['', [ Validators.required]],
          habilitado: [true, Validators.required],
          id_administrador: [this.loginService.administrador.id, [Validators.required]],
          });
        }
      });
  }
  cargarArea(params: any): void {
    this.grupoService.buscar(params.id)
    .subscribe((resp: any) => {
      this.area = resp;
      this.cargarformulario = true;
      this.areaForm = this.fb.group({
      nombre: [this.area.nombre, [ Validators.required]],
      habilitado: [this.area.habilitado, Validators.required],
      id_administrador: [this.loginService.administrador.id, [Validators.required]],
      id: [this.area.id, [Validators.required]],
    });
  });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.areaForm.invalid) {
      return;
    }
    if (this.tipo === 'modificar') {
      this.grupoService.modificar(this.areaForm.value, this.area.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/area-laboral');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Area laboral', err.mensaje, 'error');
          });
    }else {
      this.grupoService.adicionar(this.areaForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/area-laboral');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Area laboral', err.mensaje, 'error');
          });
    }
  }
  campoNoValido( campo: string): boolean {
    if (this.areaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ocupacion } from '../../../../models/ocupacion/ocupacion.model';
import { OcupacionService } from '../../../../services/administrador/ocupacion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';
import { OcupacionSolicitanteService } from '../../../../services/solicitante/ocupacion-solicitante.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-ocupacion-solicitante',
  templateUrl: './formulario-ocupacion-solicitante.component.html',
  styleUrls: ['./formulario-ocupacion-solicitante.component.css']
})
export class FormularioOcupacionSolicitanteComponent implements OnInit {

  ocupaciones: Ocupacion[];
  formSubmitted = false;

  constructor(private ocupacionService: OcupacionService,
              private ocupacionSolicitanteService: OcupacionSolicitanteService,
              private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService) { }
  public ocupacionForm = this.fb.group({
    ocupacion: [ null , [ Validators.required]],
    solicitante: [ this.loginService.solicitante, [Validators.required]],
    habilitado: [true, [Validators.required]]
  });
  ngOnInit() {
    this.cargarOcupaciones();
  }

  cargarOcupaciones(): void {
    this.ocupacionService.listarNoAsignadasSolicitante(this.loginService.solicitante.id)
    .subscribe( (resp: Ocupacion[]) => {
      this.ocupaciones = resp;
    }, (err) => console.log(err));
  }
  select2NoValido(campo: string): boolean {
    const valor = this.ocupacionForm.get(campo).value;
    if ( valor === '' && this.formSubmitted) {
      return true;
  }
    if ( valor === 0 && this.formSubmitted) {
        return true;
    }
    if ( valor === null && this.formSubmitted) {
      return true;
    }
    if ( valor !== 0 && this.formSubmitted) {
      return false;
    }
  }

  guardar(): void {
    this.formSubmitted = true;
    if (this.ocupacionForm.invalid) {
      return;
    }
    console.log(this.ocupacionForm.value);
    this.ocupacionSolicitanteService.adicionar(this.ocupacionForm.value)
        .subscribe( (resp: any) => {
          console.log('Ocupacion Asignada');
          Swal.fire(resp.mensaje, '', 'success');
          this.router.navigate(['/ocupaciones-solicitante']);
        }, (err) => {
          console.log(err);
          Swal.fire('Error al asignar Ocupacion', err.error.mensaje, 'error');
        });
  }

}

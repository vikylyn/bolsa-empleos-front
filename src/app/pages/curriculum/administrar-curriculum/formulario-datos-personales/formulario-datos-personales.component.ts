import { Component, OnInit } from '@angular/core';
import { Solicitante } from '../../../../models/solicitante/solicitante.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoCivil } from '../../../../models/estado-civil.model';
import { Pais } from '../../../../models/pais.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { SolicitanteService } from '../../../../services/solicitante/solicitante.service';
import { LoginService } from '../../../../services/login.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { EstadoCivilService } from '../../../../services/solicitante/estado-civil.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-datos-personales',
  templateUrl: './formulario-datos-personales.component.html',
  styles: [
  ]
})
export class FormularioDatosPersonalesComponent implements OnInit {

  
  cargando = false;
  formSubmitted = false;
  solicitante: Solicitante;
  perfilForm: FormGroup;
  cargarformulario = false;
  estados_civiles: EstadoCivil[];
  paises: Pais[];
  ciudades: Ciudad[];
  constructor(private fb: FormBuilder,
              private solicictanteService: SolicitanteService,
              private loginService: LoginService,
              private ubicacionService: UbicacionService,
              private estadoCivilService: EstadoCivilService,
              private router: Router) {
                this.ubicacionService.listarPaises()
                .subscribe( (resp: Pais[]) => {
                  this.paises = resp;
                });
                this.ubicacionService.listarCiudades(1)
                .subscribe((resp: Ciudad[]) => {
                  this.ciudades = resp;
                });
                this.estadoCivilService.listar()
                .subscribe((resp: EstadoCivil []) => {
                  this.estados_civiles = resp;
                });
  }

  ngOnInit(): void {
    this.solicictanteService.buscar(this.loginService.solicitante.id)
          .subscribe( (resp: Solicitante) => {
          this.solicitante = resp;
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
            nombre: [this.solicitante.nombre, [ Validators.required]],
            apellidos: [this.solicitante.apellidos, [Validators.required]],
            email: [this.solicitante.credenciales.email, [Validators.required, Validators.email]],
            cedula: [this.solicitante.cedula, [Validators.required]],
            telefono: [this.solicitante.telefono, [Validators.required]],
            nacionalidad: [this.solicitante.nacionalidad, [Validators.required]],
            direccion: [this.solicitante.direccion, [Validators.required]],
            genero: [ this.solicitante.genero , Validators.required],
            fecha_nac: [this.solicitante.fecha_nac, Validators.required],
            id_estado_civil: [ this.solicitante.estado_civil.id, Validators.required],
            id_pais: [1, Validators.required],
            id_ciudad: [this.solicitante.ciudad.id, Validators.required],
            habilitado: [true],
            id_profesion: [this.solicitante.profesion.id]
      });
    });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.perfilForm.invalid) {
      return;
    }
    console.log(this.perfilForm.value);
    this.solicictanteService.modificar(this.perfilForm.value, this.loginService.solicitante.id)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.perfilForm.get('email').value, 'success');
          this.router.navigateByUrl('/curriculum/administracion');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar perfil', err.error.error || err.error.mensaje, 'error');
        });
  }

  campoNoValido( campo: string): boolean {
    if (this.perfilForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  selectNoValido( campo: string): boolean {
    const id = this.perfilForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  seleccionarPais(): void{
    const id_pais = this.perfilForm.get('id_pais').value;
    this.ubicacionService.listarCiudades(id_pais)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }

}

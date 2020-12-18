import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CredencialesService } from '../../services/credenciales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styles: [
  ]
})
export class CambiarPasswordComponent implements OnInit {
  public formSubmitted = false;
  public passwordForm: FormGroup;
  public rol: string;
  public nombreCompleto: string;
  private idCredencial: number;
  public alerta = false;
  constructor(
              private loginService: LoginService,
              private router: Router,
              private credencialesService: CredencialesService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
                this.rol = this.activatedRoute.snapshot.params.rol;
                if (this.rol === 'administrador') {
                  this.cargarFormularioAdministrador();
                  this.nombreCompleto = this.loginService.administrador.nombre + ' ' + this.loginService.administrador.apellidos;
                  this.idCredencial = this.loginService.administrador.credenciales.id;
                }else if (this.rol === 'solicitante') {
                  this.cargarFormularioSolicitante();
                  this.nombreCompleto = this.loginService.solicitante.nombre + ' ' + this.loginService.solicitante.apellidos;
                  this.idCredencial = this.loginService.solicitante.credenciales.id;
                }else if ( this.rol === 'empleador'){
                  this.cargarFormularioEmpleador();
                  this.nombreCompleto = this.loginService.empleador.nombre + ' ' + this.loginService.empleador.apellidos;
                  this.idCredencial = this.loginService.empleador.credenciales.id;
                }
              }

  ngOnInit(): void {

  }
  cargarFormularioAdministrador(): void {
    this.passwordForm = this.fb.group({
      password_antiguo: ['', [ Validators.required]],
      password_nuevo: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      id_credenciales: [this.loginService.administrador.credenciales.id, [Validators.required]]
    }, {
      validators: this.passwordsIguales('password_nuevo', 'password2')
    });
  }
  cargarFormularioEmpleador(): void {
    this.passwordForm = this.fb.group({
      password_antiguo: ['', [ Validators.required]],
      password_nuevo: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      id_credenciales: [this.loginService.empleador.credenciales.id, [Validators.required]]
    }, {
      validators: this.passwordsIguales('password_nuevo', 'password2')
    });
  }
  cargarFormularioSolicitante(): void {
    this.passwordForm = this.fb.group({
      password_antiguo: ['', [ Validators.required]],
      password_nuevo: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      id_credenciales: [this.loginService.solicitante.credenciales.id, [Validators.required]]
    }, {
      validators: this.passwordsIguales('password_nuevo', 'password2')
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.passwordForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  guardar(): void{
    this.formSubmitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.credencialesService.modificar(this.passwordForm.value, this.idCredencial)
    .subscribe((resp: any) => {
      console.log(resp);
      Swal.fire(resp.mensaje, '', 'success');
      this.alerta = false;
     // this.router.navigateByUrl('/curriculum/administracion');
    }, (err) => {
      console.log(err);
      Swal.fire('Error al modificar contraseña', err.error.error || err.error.mensaje || err.error.errors[0].msg, 'error');
      if (err.error.alerta) {
        this.alerta = true;
      }
    });
  }
  contrasenasNovalidas(): boolean {
    const pass1 = this.passwordForm.get('password_nuevo').value;
    const pass2 = this.passwordForm.get('password2').value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
  passwordsIguales(pass1Name: string, pass2Name: string): any {
    return ( group: FormGroup) => {
      let pass1 = group.controls[pass1Name].value;
      let pass2 = group.controls[pass2Name].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        passwordsIguales: true
      };
    };
  }

}

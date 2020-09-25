import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Administrador } from '../../../models/administrador/administrador.model';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-administrador',
  templateUrl: './formulario-administrador.component.html',
  styles: [
  ]
})
export class FormularioAdministradorComponent implements OnInit {

  cargarformulario = false;
  public formSubmitted = false;
  public adminForm: FormGroup;
  public administrador: Administrador;
  public tipo: string;
  public id: number;
  constructor(public adminService: AdministradorService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        if (params.tipo === 'modificar') {
          this.cargarAdministrador(params);
        }else{
          this.cargarformulario = true;
          this.adminForm = this.fb.group({
          nombre: ['', [ Validators.required]],
          apellidos: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          password2: ['', [Validators.required]],
          cedula: ['', [Validators.required]],
          telefono: ['', [Validators.required]],
          genero: [ 0 , Validators.required],
          habilitado: [true, Validators.required],
          id_rol: [1, [Validators.required]]
          }, {
            validators: this.passwordsIguales('password', 'password2')
          });
        }
      });
  }
  passwordsIguales(pass1Name: string, pass2Name: string): any {
    return ( group: FormGroup) => {
      const pass1 = group.controls[pass1Name].value;
      const pass2 = group.controls[pass2Name].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        passwordsIguales: true
      };
    };
  }
  contrasenasNovalidas(): boolean {
    const pass1 = this.adminForm.get('password').value;
    const pass2 = this.adminForm.get('password2').value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
  campoNoValido( campo: string): boolean {
    if (this.adminForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  selectNoValido( campo: string): boolean {
    const id = this.adminForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  cargarAdministrador(params: any): void {
    this.adminService.buscar(params.id)
    .subscribe((resp: any) => {
      this.administrador = resp;
      this.cargarformulario = true;
      this.adminForm = this.fb.group({
      nombre: [this.administrador.nombre, [ Validators.required]],
      apellidos: [this.administrador.apellidos, [Validators.required]],
      email: [this.administrador.credenciales.email, [Validators.required, Validators.email]],
      cedula: [this.administrador.cedula, [Validators.required]],
      telefono: [this.administrador.telefono, [Validators.required]],
      genero: [ this.administrador.genero , Validators.required],
      habilitado: [this.administrador.habilitado, Validators.required],
      id_rol: [1, [Validators.required]]
    });
  });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.adminForm.get('genero').value === 0) {
      return;
    }
    if (this.adminForm.invalid) {
      return;
    }
    console.log(this.adminForm.value);
    if (this.tipo === 'modificar') {
      this.adminService.modificar(this.adminForm.value, this.administrador.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/administrador');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Administrador', err.error.mensaje, 'error');
          });
    }else {
      this.adminService.adicionar(this.adminForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/administrador');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Administrador', err.error.mensaje, 'error');
          });
    }
  }


}

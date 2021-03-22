import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadorService } from '../../../services/empleador/empleador.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import Swal from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-registro-empleador',
  templateUrl: './registro-empleador.component.html',
  styles: [
  ]
})
export class RegistroEmpleadorComponent implements OnInit {

  paises: Pais[];
  ciudades: Ciudad[];
  formSubmitted = false;
  cargando = false;



  constructor(private fb: FormBuilder,
              public router: Router,
              private empleadorService: EmpleadorService,
              private ubicacionService: UbicacionService)
    {
    }

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    num_complemento_ci: [''],
    telefono: ['', [Validators.required]],
    nacionalidad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    genero: [ 'seleccionar' , [Validators.required, Validators.maxLength(1)]],
    id_pais: [1, [Validators.required, Validators.min(1)]],
    id_ciudad: [null, [Validators.required, Validators.min(1)]],
    id_rol: [3, [Validators.required]],
    empresa: [false, [Validators.required]],
    empresa_nombre: ['', [Validators.required]],
    empresa_dominio_web: [''],
    empresa_direccion: ['', [Validators.required]],
    empresa_telefono: ['', [Validators.required]],
    empresa_descripcion:['', [Validators.required]],
    empresa_id_ciudad: [ null, [Validators.required, Validators.min(1)]],
    empresa_id_pais: [1, [Validators.required, Validators.min(1)]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  ngOnInit(): void {
    init_plugins();
    this.cargarPaises();
    this.cargarCiudades();
  }
  cargarCiudades(): void {
    this.ubicacionService.listarPaises()
    .subscribe( (resp: Pais[]) => {
      this.paises = resp;
     });
  }
  cargarPaises(): void {
    this.ubicacionService.listarCiudades(1)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  adicionarEmpleador(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (
        this.registerForm.get('genero').value === 0 ||
        this.registerForm.get('id_ciudad').value === 0 ||
        this.registerForm.get('id_pais').value === 0) {
      return;
    }
    if ( this.registerForm.get('empresa').value === false) {
      this.registerForm.get('empresa_nombre').disable();
      this.registerForm.get('empresa_dominio_web').disable();
      this.registerForm.get('empresa_direccion').disable();
      this.registerForm.get('empresa_telefono').disable();
      this.registerForm.get('empresa_descripcion').disable();
      this.registerForm.get('empresa_id_ciudad').disable();
      this.registerForm.get('empresa_id_pais').disable();
    }

    if (this.registerForm.invalid) {
      return;
    }
    this.cargando = true;

    if ( this.registerForm.get('empresa').value === true) {
      if (
        this.registerForm.get('empresa_id_ciudad').value === 0 ||
        this.registerForm.get('empresa_id_pais').value === 0 ) {
          this.cargando = false;
          return;
     }
      this.empleadorService.adicionarEmpleadorEmpresa(this.registerForm.value)
      .subscribe( (resp: any) => {
        Swal.fire(resp.mensaje, this.registerForm.get('email').value, 'success');
        this.cargando = false;
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
        Swal.fire('Error al crear Empleador', err.error.mensaje, 'error');
      });
    }else {
      console.log(this.registerForm.value);
      this.empleadorService.adicionarEmpleador(this.registerForm.value)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.registerForm.get('email').value, 'success');
          this.cargando = false;
          this.router.navigate(['/login']);
        }, (err) => {
          console.log(err);
          Swal.fire('Error al crear Empleador', err.error.mensaje, 'error');
        });
    
    }
  }
  campoNoValido( campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  mostrar(): boolean {
    if ( this.registerForm.get('empresa').value === true) {
      if (this.formSubmitted) {
        this.registerForm.get('empresa_nombre').enable();
        this.registerForm.get('empresa_dominio_web').enable();
        this.registerForm.get('empresa_direccion').enable();
        this.registerForm.get('empresa_telefono').enable();
        this.registerForm.get('empresa_descripcion').enable();
        this.registerForm.get('empresa_id_ciudad').enable();
        this.registerForm.get('empresa_id_pais').enable();
      }
      return true;
    }else {
      return false;
    }
  }
  contrasenasNovalidas(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
  passwordsIguales(pass1Name: string, pass2Name: string) {
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

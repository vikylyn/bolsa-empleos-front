import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Administrador } from '../../../../models/administrador/administrador.model';
import { AdministradorService } from '../../../../services/administrador/administrador.service';
import Swal from 'sweetalert2';
import { Pais } from '../../../../models/pais.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';

@Component({
  selector: 'app-formulario-administrador',
  templateUrl: './formulario-administrador.component.html',
  styles: [
  ]
})
export class FormularioAdministradorComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idAdministrador: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  cargandoModal = true;
  cargarformulario = false;
  cargando = false;
  public formSubmitted = false;
  public adminForm: FormGroup;
  public administrador: Administrador;
  paises: Pais[];
  ciudades: Ciudad[];
  constructor(public adminService: AdministradorService,
              private ubicacionService: UbicacionService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarCiudades();
    if (this.tipoOperacion === 'modificar') {
      this.cargarAdministrador();
    }else{
      this.cargarformulario = true;
      this.adminForm = this.fb.group({
      nombre: ['', [ Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      num_complemento_ci: [''],
      telefono: ['', [Validators.required]],
      genero: [ 'seleccionar' , [Validators.required, Validators.maxLength(1)]],
      habilitado: [true, Validators.required],
      id_rol: [1, [Validators.required]],
      direccion: ['', [Validators.required]],
      id_ciudad: [null , [Validators.required, Validators.min(1)]],
      id_pais: [1 , [Validators.required, Validators.min(1)]]
      }, {
        validators: this.passwordsIguales('password', 'password2')
      });
      this.cargandoModal = false;
    }
  }
  cargarCiudades(): void {
    this.ubicacionService.listarCiudades(1)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises()
    .subscribe( (resp: Pais[]) => {
      this.paises = resp.filter( (pais: Pais) => pais.nombre === 'Bolivia');
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
    if (this.adminForm.get(campo).invalid && this.adminForm.get(campo).touched) {
      return true;
    }else if (this.adminForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  cargarAdministrador(): void {
    this.adminService.buscar(this.idAdministrador)
    .subscribe((resp: any) => {
      this.administrador = resp;
      this.cargarformulario = true;
      this.adminForm = this.fb.group({
      nombre: [this.administrador.nombre, [ Validators.required]],
      apellidos: [this.administrador.apellidos, [Validators.required]],
      email: [this.administrador.credenciales.email, [Validators.required, Validators.email]],
      cedula: [this.administrador.cedula, [Validators.required]],
      num_complemento_ci: [this.administrador.num_complemento_ci],
      telefono: [this.administrador.telefono, [Validators.required]],
      genero: [ this.administrador.genero , [Validators.required, Validators.maxLength(1)]],
      habilitado: [this.administrador.habilitado, Validators.required],
      id_rol: [1, [Validators.required]],
      direccion: [this.administrador.direccion, [Validators.required]],
      id_ciudad: [this.administrador.ciudad.id, [Validators.required, Validators.min(1)]],
      id_pais: [this.administrador.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]]
      });
      this.cargandoModal = false;
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
    this.cargando = true;
    if (this.tipoOperacion === 'modificar') {
      this.adminService.modificar(this.adminForm.value, this.administrador.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al modificar Administrador', err.error.mensaje, 'error');
          });
    }else {
      this.adminService.adicionar(this.adminForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al adicionar Administrador', err.error.mensaje, 'error');
          });
    }
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
  minlength(): boolean {
    if (this.adminForm.controls.password.errors && this.adminForm.controls.password.errors.minlength) {
      return true;
    }else {
      return false;
    }
  }

  email(): boolean {
    if (this.adminForm.controls.email.errors && this.adminForm.controls.email.errors.email) {
      return true;
    }else {
      return false;
    }
  }
}

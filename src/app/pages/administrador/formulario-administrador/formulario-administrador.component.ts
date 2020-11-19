import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Administrador } from '../../../models/administrador/administrador.model';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import Swal from 'sweetalert2';

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

  cargarformulario = false;
  public formSubmitted = false;
  public adminForm: FormGroup;
  public administrador: Administrador;
  constructor(public adminService: AdministradorService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.tipoOperacion === 'modificar') {
      this.cargarAdministrador();
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
    if (this.tipoOperacion === 'modificar') {
      this.adminService.modificar(this.adminForm.value, this.administrador.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Administrador', err.error.mensaje, 'error');
          });
    }else {
      this.adminService.adicionar(this.adminForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
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

}

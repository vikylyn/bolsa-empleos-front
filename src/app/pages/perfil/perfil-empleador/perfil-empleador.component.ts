import { Component, OnInit } from '@angular/core';
import { Empleador } from '../../../models/empleador/empleador.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { LoginService } from '../../../services/login.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { EmpleadorService } from '../../../services/empleador/empleador.service';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../../services/websocket/websocket.service';

@Component({
  selector: 'app-perfil-empleador',
  templateUrl: './perfil-empleador.component.html',
  styles: [
  ]
})
export class PerfilEmpleadorComponent implements OnInit {

  cargandoFormulario = false;
  cargandoImagen = false;
  formSubmitted = false;
  empleador: Empleador;
  perfilForm: FormGroup;
  cargarformulario = false;
  paises: Pais[];
  ciudades: Ciudad[];
  constructor(private fb: FormBuilder,
              private empleadorService: EmpleadorService,
              private loginService: LoginService,
              private wsService: WebsocketService,
              private ubicacionService: UbicacionService) {
                this.ubicacionService.listarPaises()
                .subscribe( (resp: Pais[]) => {
                  this.paises = resp;
                });
                this.ubicacionService.listarCiudades(1)
                .subscribe((resp: Ciudad[]) => {
                  this.ciudades = resp;
                });
  }

  ngOnInit(): void {
    this.cargarEmpleador();
  }
  cargarEmpleador(): void {
    this.empleadorService.buscar(this.loginService.empleador.id)
          .subscribe( (resp: Empleador) => {
          this.empleador = resp;
          this.cargarFormulario();
    });
  }
  cargarFormulario(): void {
    this.cargarformulario = true;
    this.perfilForm = this.fb.group({
      nombre: [this.empleador.nombre, [ Validators.required]],
      apellidos: [this.empleador.apellidos, [Validators.required]],
      email: [this.empleador.credenciales.email, [Validators.required, Validators.email]],
      cedula: [this.empleador.cedula, [Validators.required]],
      num_complemento_ci: [this.empleador.num_complemento_ci],
      telefono: [this.empleador.telefono, [Validators.required]],
      nacionalidad: [this.empleador.nacionalidad, [Validators.required]],
      direccion: [this.empleador.direccion, [Validators.required]],
      genero: [ this.empleador.genero , Validators.required],
      id_pais: [this.empleador.ciudad.estado.pais.id, Validators.required],
      id_ciudad: [this.empleador.ciudad.id, Validators.required],
      id_rol: [this.empleador.credenciales.rol.id, [Validators.required]],
      empresa: [this.empleador.empresa, [Validators.required]],
    });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.perfilForm.invalid) {
      return;
    }
    this.cargandoFormulario = true;
    this.empleadorService.modificar(this.perfilForm.value, this.loginService.empleador.id)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.perfilForm.get('email').value, 'success');
          this.cargandoFormulario = false;
          // modificando la variable de Tipo empleador de loginService para actualizar los atributos cambiados del sidebar y header
          this.empleadorService.buscar(this.loginService.empleador.id).subscribe(( respuesta: Empleador) => {
          this.loginService.guardarStorage(respuesta, this.loginService.token);
          this.wsService.emitir('actualizar-usuario');
          });
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

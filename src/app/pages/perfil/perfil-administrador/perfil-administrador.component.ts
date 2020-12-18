import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import { Administrador } from '../../../models/administrador/administrador.model';
import { LoginService } from '../../../services/login.service';
import { WebsocketService } from '../../../services/websocket/websocket.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';


@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styles: [
  ]
})
export class PerfilAdministradorComponent implements OnInit {
  cargando = false;
  formSubmitted = false;
  administrador: Administrador;
  perfilForm: FormGroup;
  cargarformulario = false;
  paises: Pais[];
  ciudades: Ciudad[];
  constructor(private fb: FormBuilder,
              private administradorService: AdministradorService,
              private ubicacionService: UbicacionService,
              private wsService: WebsocketService,
              private loginService: LoginService) {
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
    this.administradorService.buscar(this.loginService.administrador.id)
          .subscribe( (resp: Administrador) => {
          this.administrador = resp;
          console.log('administrador', this.administrador);
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
          nombre: [this.administrador.nombre, [ Validators.required]],
          apellidos: [this.administrador.apellidos, [Validators.required]],
          email: [this.administrador.credenciales.email, [Validators.required, Validators.email]],
          cedula: [this.administrador.cedula, [Validators.required]],
          telefono: [this.administrador.telefono, [Validators.required]],
          genero: [ this.administrador.genero , Validators.required],
          habilitado: [this.administrador.habilitado, Validators.required],
          id: [this.administrador.id, [Validators.required]],
          rol: [this.administrador.credenciales.rol.id],
          credenciales: [this.administrador.credenciales.id],
          direccion: [this.administrador.direccion, [Validators.required]],
          id_ciudad: [this.administrador.ciudad.id, [Validators.required, Validators.min(1)]],
          id_pais: [this.administrador.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]]
      });
    });
  }

  campoNoValido( campo: string): boolean {
    if (this.perfilForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    console.log(this.perfilForm.value);
    if (this.perfilForm.invalid) {
      return;
    }
    this.cargando = true;
    this.administradorService.modificar(this.perfilForm.value, this.perfilForm.get('id').value)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.perfilForm.get('email').value, 'success');
          this.cargando = false;
          // modificando la variable administrador de loginService para actualizar los atributos cambiados del sidebar y header
          this.administradorService.buscar(this.loginService.administrador.id).subscribe(( respuesta: Administrador) => {
            this.loginService.guardarStorage(respuesta, this.loginService.token);
            this.wsService.emitir('actualizar-usuario');
        });

        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar perfil', 'Existe un usuario con ese correo', 'error');
        });
  }

}

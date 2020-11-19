import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import { Administrador } from '../../../models/administrador/administrador.model';
import { ImagenService } from '../../../services/imagen.service';
import { LoginService } from '../../../services/login.service';
import { WebsocketService } from '../../../services/websocket/websocket.service';


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
  constructor(private fb: FormBuilder,
              private administradorService: AdministradorService,
              private wsService: WebsocketService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.administradorService.buscar(this.loginService.administrador.id)
          .subscribe( (resp: Administrador) => {
          this.administrador = resp;
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
          credenciales: [this.administrador.credenciales.id]
      });
    });
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

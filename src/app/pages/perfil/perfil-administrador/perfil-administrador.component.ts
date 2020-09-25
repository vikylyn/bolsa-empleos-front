import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import { Administrador } from '../../../models/administrador/administrador.model';
import { ImagenService } from '../../../services/imagen.service';
import { LoginService } from '../../../services/login.service';


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
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  constructor(private fb: FormBuilder,
              private administradorService: AdministradorService,
              private imagenService: ImagenService,
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
    this.administradorService.modificar(this.perfilForm.value, this.perfilForm.get('id').value)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.perfilForm.get('email').value, 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar perfil', 'Existe un usuario con ese correo', 'error');
        });
  }

 /* campoNoValido( campo: string): boolean {
    if (this.perfilForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
*/
  seleccionImagen( archivo: File ) {
    if (!archivo) {
      return;
    }
    // si es menor a uno no es una imagen
    if (archivo.type.indexOf('image') < 0 ) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }
  cambiarImagen() {
     this.cargando = true;
     this.imagenService.cambiarImagen(this.imagenSubir, 'administrador', this.administrador.id).subscribe(
       (resp: any) => {
        Swal.fire('Imagen actualizada con exito', 'La imagen ha sido actualizada con exito', 'success');
        this.loginService.guardarImagenStorage(resp);
        this.cargando = false;
     });

  }

}

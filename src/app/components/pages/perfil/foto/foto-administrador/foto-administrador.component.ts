import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Administrador } from '../../../../../models/administrador/administrador.model';
import { AdministradorService } from '../../../../../services/administrador/administrador.service';
import { ImagenService } from '../../../../../services/imagen.service';
import { LoginService } from '../../../../../services/login.service';

@Component({
  selector: 'app-foto-administrador',
  templateUrl: './foto-administrador.component.html',
  styles: [
  ]
})
export class FotoAdministradorComponent implements OnInit {
  cargando = false;
  administrador: Administrador;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  constructor(
              private administradorService: AdministradorService,
              private imagenService: ImagenService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.cargando = true;
    this.administradorService.buscar(this.loginService.administrador.id)
          .subscribe( (resp: Administrador) => {
          this.administrador = resp;
          this.cargando = false;
    }, (err) => {
      console.log(err);
      Swal.fire('Error al buscar', err.error.error || err.error.mensaje, 'error');
      this.cargando = false;
    });
  }

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
        Swal.fire(resp.mensaje, '', 'success');
        this.loginService.guardarImagenStorage(resp.imagen, this.loginService.administrador.credenciales.rol.nombre);
        this.cargando = false;
     }, (err) => {
      console.log(err);
      Swal.fire('Error al modificar foto de perfil', err.error.error || err.error.mensaje, 'error');
      this.cargando = false;
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { Empleador } from '../../../../../models/empleador/empleador.model';
import { EmpleadorService } from '../../../../../services/empleador/empleador.service';
import { ImagenService } from '../../../../../services/imagen.service';
import { LoginService } from '../../../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foto-empleador',
  templateUrl: './foto-empleador.component.html',
  styles: [
  ]
})
export class FotoEmpleadorComponent implements OnInit {

  cargando = false;
  empleador: Empleador;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  mensaje = 'Cargando...'
  constructor(
              private empleadorService: EmpleadorService,
              private imagenService: ImagenService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.cargando = true;
    this.empleadorService.buscar(this.loginService.empleador.id)
          .subscribe( (resp: Empleador) => {
          this.empleador = resp;
          this.cargando = false;
    });
  }

  seleccionImagen( archivo: File ): any {
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
  cambiarImagen(): void {
     this.cargando = true;
     this.mensaje = 'Subiendo Imagen...'
     this.imagenService.cambiarImagen(this.imagenSubir, 'empleador', this.empleador.id).subscribe(
       (resp: any) => {
        console.log(resp);
        Swal.fire(resp.mensaje, '', 'success');
        this.loginService.guardarImagenStorage(resp.imagen, this.loginService.empleador.credenciales.rol.nombre);
        this.cargando = false;
     }, (err) => {
      console.log(err);
      Swal.fire('Error al modificar foto de perfil', err.error.error || err.error.mensaje, 'error');
      this.cargando = false;
    });

  }

}

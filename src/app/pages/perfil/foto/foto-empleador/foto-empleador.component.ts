import { Component, OnInit } from '@angular/core';
import { Empleador } from '../../../../models/empleador/empleador.model';
import { EmpleadorService } from '../../../../services/empleador/empleador.service';
import { ImagenService } from '../../../../services/imagen.service';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foto-empleador',
  templateUrl: './foto-empleador.component.html',
  styles: [
  ]
})
export class FotoEmpleadorComponent implements OnInit {

  cargandoImagen = false;
  empleador: Empleador;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  constructor(
              private empleadorService: EmpleadorService,
              private imagenService: ImagenService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.empleadorService.buscar(this.loginService.empleador.id)
          .subscribe( (resp: Empleador) => {
          this.empleador = resp;
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
     this.cargandoImagen = true;
     this.imagenService.cambiarImagen(this.imagenSubir, 'empleador', this.empleador.id).subscribe(
       (resp: any) => {
        Swal.fire('Imagen actualizada con exito', 'La imagen ha sido actualizada con exito', 'success');
        this.loginService.guardarImagenStorage(resp);
        this.cargandoImagen = false;
     });

  }

}

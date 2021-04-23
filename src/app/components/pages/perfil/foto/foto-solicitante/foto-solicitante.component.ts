import { Component, OnInit } from '@angular/core';
import { Solicitante } from '../../../../../models/solicitante/solicitante.model';
import { SolicitanteService } from '../../../../../services/solicitante/solicitante.service';
import { ImagenService } from '../../../../../services/imagen.service';
import { LoginService } from '../../../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foto-solicitante',
  templateUrl: './foto-solicitante.component.html',
  styles: [
  ]
})
export class FotoSolicitanteComponent implements OnInit {

  cargando = false;
  formSubmitted = false;
  solicitante: Solicitante;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  constructor(
              private solicictanteService: SolicitanteService,
              private imagenService: ImagenService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.cargando = true;
    this.solicictanteService.buscar(this.loginService.solicitante.id)
          .subscribe( (resp: Solicitante) => {
          this.solicitante = resp;
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
     this.imagenService.cambiarImagen(this.imagenSubir, 'solicitante', this.solicitante.id).subscribe(
       (resp: any) => {
        Swal.fire(resp.mensaje, '', 'success');
        this.loginService.guardarImagenStorage(resp.imagen, this.loginService.solicitante.credenciales.rol.nombre);
        this.cargando = false;
     }, (err) => {
      console.log(err);
      Swal.fire('Error al modificar foto de perfil', err.error.error || err.error.mensaje, 'error');
      this.cargando = false;
    });

  }

}

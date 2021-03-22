import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empleador/empresa.model';
import { EmpresaService } from '../../../../services/empleador/empresa.service';
import { ImagenService } from '../../../../services/imagen.service';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';
import { Imagen } from '../../../../models/imagen.model';

@Component({
  selector: 'app-foto-empresa',
  templateUrl: './foto-empresa.component.html',
  styles: [
  ]
})
export class FotoEmpresaComponent implements OnInit {

  cargandoLogo = false;
  empresa: Empresa;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  constructor(
              private empresaService: EmpresaService,
              private imagenService: ImagenService,
              private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.cargarEmpresa();

  }
  cargarEmpresa(): void{
    this.empresaService.buscarPorIdEmpleador(this.loginService.empleador.id)
        .subscribe((resp: Empresa) => {
          this.empresa = resp;
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
     this.cargandoLogo = true;
     this.imagenService.cambiarImagen(this.imagenSubir, 'empresa', this.empresa.id).subscribe(
       (resp: Imagen) => {
        Swal.fire('Imagen actualizada con exito', 'La imagen ha sido actualizada con exito', 'success');
        this.loginService.guardarImagenStorage(resp, 'ROLE_EMPRESA'); // Se creo este rol solo para actualizar el logo de la empresa
        this.cargandoLogo = false;
     });

  }
}

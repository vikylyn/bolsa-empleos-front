import { Component, OnInit } from '@angular/core';
import { InformacionApp } from '../../../models/informacion-app.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { InformacionAppService } from '../../../services/informacion-app.service';
import Swal from 'sweetalert2';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { ImagenService } from '../../../services/imagen.service';
import { LoginService } from '../../../services/login.service';
import { ValidacionFormularioService } from '../../../services/validacion-formulario.service';

@Component({
  selector: 'app-informacion-app',
  templateUrl: './informacion-app.component.html',
  styles: [
  ]
})
export class InformacionAppComponent implements OnInit {

  cargando = true;
  formSubmitted = false;
  informacion: InformacionApp;
  infoForm: FormGroup;
  cargarformulario = false;
  paises: Pais[];
  ciudades: Ciudad[];
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
              private infoService: InformacionAppService,
              private imagenService: ImagenService,
              private loginService: LoginService,
              public validacionService: ValidacionFormularioService,
              private ubicacionService: UbicacionService) {
                this.cargarPaises();
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises()
    .subscribe( (resp: Pais[]) => {
      this.paises = resp;
      this.cargarCiudades(this.paises[0].id);
    });
  }
  cargarCiudades(idPais: number): void {
    this.ubicacionService.listarCiudades(idPais)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  ngOnInit(): void {
    this.infoService.buscar(1)
          .subscribe( (resp: InformacionApp) => {
          this.informacion = resp;
          this.cargarformulario = true;
          this.infoForm = this.fb.group({
          nombre: [this.informacion.nombre, [ Validators.required]],
          eslogan: [this.informacion.eslogan, [Validators.required]],
          email: [this.informacion.email, [Validators.required, Validators.email]],
          descripcion: [this.informacion.descripcion, [Validators.required]],
          telefono: [this.informacion.telefono, [Validators.required]],
          direccion: [ this.informacion.direccion , Validators.required],
          id_pais: [this.informacion.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]],
          id_ciudad: [this.informacion.ciudad.id, [Validators.required, Validators.min(1)]],
          id_administrador: [this.loginService.administrador.id, [Validators.required, Validators.min(1)]],
        });
          this.cargando = false;
    });
  }

  campoNoValido( campo: string): boolean {
    if (this.infoForm.get(campo).invalid && this.infoForm.get(campo).touched) {
      return true;
    }else if (this.infoForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    console.log(this.infoForm.value);
    if (this.infoForm.invalid) {
      return;
    }
    this.cargando = true;
    this.infoService.modificar(this.infoForm.value, this.informacion.id)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar informacion', err, 'error');
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
  cambiarImagen(): void {
     this.cargando = true;
     this.imagenService.cambiarImagen(this.imagenSubir, 'logo-app', this.informacion.id).subscribe(
       (resp: any) => {
        this.cargando = false;
        Swal.fire(resp.mensaje, '', 'success');
     }, (err) => {
      console.log(err);
      Swal.fire('Error al modificar logo', err.error.error || err.error.mensaje, 'error');
      this.cargando = false;
    });
  }

  email(): boolean {
    if (this.infoForm.controls.email.errors && this.infoForm.controls.email.errors.email) {
      return true;
    }else {
      return false;
    }
  }

}

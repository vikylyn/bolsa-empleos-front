import { Component, OnInit } from '@angular/core';
import { Empleador } from '../../../models/empleador/empleador.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { ImagenService } from '../../../services/imagen.service';
import { LoginService } from '../../../services/login.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { EstadoCivilService } from '../../../services/solicitante/estado-civil.service';
import { EmpleadorService } from '../../../services/empleador/empleador.service';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../../services/empleador/empresa.service';
import { Empresa } from '../../../models/empleador/empresa.model';

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
  imagenSubir: File;
  paises: Pais[];
  ciudades: Ciudad[];
  imagenTemp: string | ArrayBuffer;
  constructor(private fb: FormBuilder,
              private empleadorService: EmpleadorService,
              private imagenService: ImagenService,
              private loginService: LoginService,
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
    this.empleadorService.buscar(this.loginService.empleador.id)
          .subscribe( (resp: Empleador) => {
          this.empleador = resp;
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
            nombre: [this.empleador.nombre, [ Validators.required]],
            apellidos: [this.empleador.apellidos, [Validators.required]],
            email: [this.empleador.credenciales.email, [Validators.required, Validators.email]],
            cedula: [this.empleador.cedula, [Validators.required]],
            telefono: [this.empleador.telefono, [Validators.required]],
            nacionalidad: [this.empleador.nacionalidad, [Validators.required]],
            direccion: [this.empleador.direccion, [Validators.required]],
            genero: [ this.empleador.genero , Validators.required],
            id_pais: [this.empleador.ciudad.estado.pais.id, Validators.required],
            id_ciudad: [this.empleador.ciudad.id, Validators.required],
            id_rol: [this.empleador.credenciales.rol.id, [Validators.required]],
            empresa: [this.empleador.empresa, [Validators.required]],
          });
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

  seleccionarPais(): void{
    const id_pais = this.perfilForm.get('id_pais').value;
    this.ubicacionService.listarCiudades(id_pais)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { EmpresaService } from '../../../services/empleador/empresa.service';
import { ImagenService } from '../../../services/imagen.service';
import { LoginService } from '../../../services/login.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { Empresa } from '../../../models/empleador/empresa.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styles: [
  ]
})
export class PerfilEmpresaComponent implements OnInit {

  cargandoFormulario = false;
  formSubmitted = false;
  perfilForm: FormGroup;
  empresa: Empresa;
  cargarformulario = false;
  paises: Pais[];
  ciudades: Ciudad[];
  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
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
    this.cargarFormularioEmpresa();

  }
  cargarFormularioEmpresa(): void{
    this.empresaService.buscarPorIdEmpleador(this.loginService.empleador.id)
        .subscribe((resp: Empresa) => {
          this.empresa = resp;
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
            nombre: [resp.nombre, [Validators.required]],
            dominio_web: [resp.dominio_web],
            direccion: [resp.direccion, [Validators.required]],
            telefono: [resp.telefono, [Validators.required]],
            descripcion:[resp.descripcion, [Validators.required]],
            id_ciudad: [ resp.ciudad.id, [Validators.required]],
            id_pais: [resp.ciudad.estado.pais.id, Validators.required],
            id_empleador: [this.loginService.empleador.id, Validators.required],
          });
        });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.perfilForm.invalid) {
      return;
    }
    console.log(this.perfilForm.value);
    this.cargandoFormulario = true;
    this.empresaService.modificar(this.perfilForm.value, this.empresa.id)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
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

  seleccionarPais(): void{
    const id_pais = this.perfilForm.get('id_pais').value;
    this.ubicacionService.listarCiudades(id_pais)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from '../../../../models/pais.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { EmpresaService } from '../../../../services/empleador/empresa.service';
import { LoginService } from '../../../../services/login.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { Empresa } from '../../../../models/empleador/empresa.model';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../../../services/websocket/websocket.service';
import { RazonSocialService } from '../../../../services/empleador/razon-social.service';
import { RazonSocial } from '../../../../models/empleador/razon-social.model';
import { ValidacionFormularioService } from '../../../../services/validacion-formulario.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styles: [
  ]
})
export class PerfilEmpresaComponent implements OnInit {

  cargandoFormulario = false;
  cargando = false;
  formSubmitted = false;
  perfilForm: FormGroup;
  empresa: Empresa;
  cargarformulario = false;
  paises: Pais[];
  ciudades: Ciudad[];
  razonesSociales: RazonSocial [];

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private loginService: LoginService,
              private wsService: WebsocketService,
              public validacionService: ValidacionFormularioService,
              private razonSocialService: RazonSocialService,
              private ubicacionService: UbicacionService) {
  }
  ngOnInit(): void {
    this.cargarFormularioEmpresa();
    this.cargarPaises();
    this.cargarCiudades();
    this.cargarRazonesSociales();
  }
  cargarFormularioEmpresa(): void{
    this.cargando = true;
    this.empresaService.buscarPorIdEmpleador(this.loginService.empleador.id)
        .subscribe((resp: Empresa) => {
          this.empresa = resp;
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
            nombre: [resp.nombre, [Validators.required]],
            id_razon_social: [ resp.razon_social.id , [Validators.required, Validators.min(1)]],
            dominio_web: [resp.dominio_web],
            direccion: [resp.direccion, [Validators.required]],
            telefono: [resp.telefono, [Validators.required]],
            descripcion:[resp.descripcion, [Validators.required]],
            id_ciudad: [ resp.ciudad.id, [Validators.required]],
            id_pais: [resp.ciudad.estado.pais.id, Validators.required],
            id_empleador: [this.loginService.empleador.id, Validators.required],
          });
          this.cargando = false;
        });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.perfilForm.invalid) {
      return;
    }
    this.cargando = true;
    this.empresaService.modificar(this.perfilForm.value, this.empresa.id)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          // modificando la variable de empresa de loginService para actualizar los atributos cambiados del sidebar y header
          this.empresaService.buscarPorIdEmpleador(this.loginService.empleador.id).subscribe(( respuesta: Empresa) => {
            this.loginService.empleador.empresa = respuesta;
            this.loginService.guardarStorage(this.loginService.empleador, this.loginService.token);
            this.wsService.emitir('actualizar-usuario');
        });
        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar perfil', err.error.error || err.error.mensaje, 'error');
          this.cargando = false;
        });
  }

  campoNoValido( campo: string): boolean {
    if (this.perfilForm.get(campo).invalid && this.perfilForm.get(campo).touched) {
      return true;
    }else if (this.perfilForm.get(campo).invalid && this.formSubmitted) {
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

  cargarRazonesSociales(): void {
    this.razonSocialService.listar().subscribe(({razones_sociales}) => {
      this.razonesSociales = razones_sociales;
    });
  }
  cargarCiudades(): void {

     this.ubicacionService.listarCiudades(1)
     .subscribe((resp: Ciudad[]) => {
       this.ciudades = resp;
     });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises()
    .subscribe( (resp: Pais[]) => {
      this.paises = resp.filter( (pais: Pais) => pais.nombre === 'Bolivia');
     });
  }
}

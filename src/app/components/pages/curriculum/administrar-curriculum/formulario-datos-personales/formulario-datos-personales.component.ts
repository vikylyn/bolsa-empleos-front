import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solicitante } from '../../../../../models/solicitante/solicitante.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoCivil } from '../../../../../models/estado-civil.model';
import { Pais } from '../../../../../models/pais.model';
import { Ciudad } from '../../../../../models/ciudad.model';
import { SolicitanteService } from '../../../../../services/solicitante/solicitante.service';
import { LoginService } from '../../../../../services/login.service';
import { UbicacionService } from '../../../../../services/ubicacion/ubicacion.service';
import { EstadoCivilService } from '../../../../../services/solicitante/estado-civil.service';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../../../../services/websocket/websocket.service';


@Component({
  selector: 'app-formulario-datos-personales',
  templateUrl: './formulario-datos-personales.component.html',
  styleUrls: [
  ]
})
export class FormularioDatosPersonalesComponent implements OnInit {
  @Input() visible: boolean;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();


  formSubmitted = false;
  solicitante: Solicitante;
  perfilForm: FormGroup;
  cargarformulario = false;
  estados_civiles: EstadoCivil[];
  paises: Pais[];
  ciudades: Ciudad[];
  cargandoModal = true;
  cargando = false;
  constructor(private fb: FormBuilder,
              private solicitanteService: SolicitanteService,
              private loginService: LoginService,
              private ubicacionService: UbicacionService,
              private wsService: WebsocketService,
              private estadoCivilService: EstadoCivilService) {
                this.ubicacionService.listarPaises()
                .subscribe( (resp: Pais[]) => {
                  this.paises = resp;
                });
                this.ubicacionService.listarCiudades(1)
                .subscribe((resp: Ciudad[]) => {
                  this.ciudades = resp;
                });
                this.estadoCivilService.listar()
                .subscribe((resp: EstadoCivil []) => {
                  this.estados_civiles = resp;
                });
  }

  ngOnInit(): void {
    this.solicitanteService.buscar(this.loginService.solicitante.id)
          .subscribe( (resp: Solicitante) => {
          this.solicitante = resp;
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
            nombre: [this.solicitante.nombre, [ Validators.required]],
            apellidos: [this.solicitante.apellidos, [Validators.required]],
            email: [this.solicitante.credenciales.email, [Validators.required, Validators.email]],
            cedula: [this.solicitante.cedula, [Validators.required]],
            num_complemento_ci: [this.solicitante.num_complemento_ci],
            telefono: [this.solicitante.telefono, [Validators.required]],
            nacionalidad: [this.solicitante.nacionalidad, [Validators.required]],
            direccion: [this.solicitante.direccion, [Validators.required]],
            genero: [ this.solicitante.genero , [Validators.required]],
            fecha_nac: [this.solicitante.fecha_nac, [Validators.required]],
            id_estado_civil: [ this.solicitante.estado_civil.id, [Validators.required, Validators.min(1)]],
            id_pais: [1, [Validators.required, Validators.min(1)]],
            id_ciudad: [this.solicitante.ciudad.id, [Validators.required, Validators.min(1)]],
            habilitado: [true],
      });
          this.cargandoModal = false;
    });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.perfilForm.invalid) {
      return;
    }
    this.cargando = true;
    this.solicitanteService.modificar(this.perfilForm.value, this.loginService.solicitante.id)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.perfilForm.get('email').value, 'success');
          // modificando la variable solicitante de loginService para actualizar los atributos cambiados del sidebar y header
          this.solicitanteService.buscar(this.loginService.solicitante.id).subscribe(( respuesta: Solicitante) => {
            this.loginService.guardarStorage(respuesta, this.loginService.token);
            this.wsService.emitir('actualizar-usuario');
          });
          this.cargando = false;
          this.cerrarModal();
        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar perfil', err.error.error || err.error.mensaje, 'error');
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
  seleccionarPais(): void{
    const id_pais = this.perfilForm.get('id_pais').value;
    this.ubicacionService.listarCiudades(id_pais)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  cancelarModal() {
    this.cancelar.emit(false);
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  email(): boolean {
    if (this.perfilForm.controls.email.errors && this.perfilForm.controls.email.errors.email) {
      return true;
    }else {
      return false;
    }
  }
}

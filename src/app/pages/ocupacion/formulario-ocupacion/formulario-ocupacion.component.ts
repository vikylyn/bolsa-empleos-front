import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ocupacion } from '../../../models/ocupacion/ocupacion.model';
import { OcupacionService } from '../../../services/administrador/ocupacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { GrupoOcupacionalService } from '../../../services/administrador/grupo-ocupacional.service';
import { GrupoOcupacional } from '../../../models/ocupacion/grupo-ocupacional.model';

@Component({
  selector: 'app-formulario-ocupacion',
  templateUrl: './formulario-ocupacion.component.html',
  styles: [
  ]
})
export class FormularioOcupacionComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idOcupacion: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  cargarformulario = false;
  public formSubmitted = false;
  public ocupacionForm: FormGroup;
  public ocupacion: Ocupacion;
  gruposOcupacionales: GrupoOcupacional[];

  constructor(public ocupacionService: OcupacionService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              public grupoService: GrupoOcupacionalService) { }

  ngOnInit(): void {

    if ( this.tipoOperacion === 'modificar') {
      this.cargarOcupacion();
    }else{
      this.cargarformulario = true;
      this.ocupacionForm = this.fb.group({
      nombre: ['', [ Validators.required]],
  //    codigo: ['', [ Validators.required]],
      habilitado: [true, Validators.required],
      id_grupo_ocupacional: [null, [Validators.required, Validators.min(1)]],
      id_administrador: [this.loginService.administrador.id, [Validators.required]],
      });
    }
    this.cargarGruposOcupacionales();
  }
  cargarGruposOcupacionales(): void {
    this.grupoService.listarTodas().subscribe( (resp: GrupoOcupacional[]) => {
      this.gruposOcupacionales = resp;
    });
  }

  campoNoValido( campo: string): boolean {
    if (this.ocupacionForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  cargarOcupacion(): void {
    this.ocupacionService.buscar(this.idOcupacion)
    .subscribe((resp: any) => {
      this.ocupacion = resp;
      console.log('respuesta', resp);
      this.cargarformulario = true;
      this.ocupacionForm = this.fb.group({
      nombre: [this.ocupacion.nombre, [ Validators.required]],
 //     codigo: [this.ocupacion.codigo, [ Validators.required]],
      habilitado: [this.ocupacion.habilitado, Validators.required],
      id_grupo_ocupacional: [this.ocupacion.grupo_ocupacional.id, [Validators.required, Validators.min(1)]],
      id_administrador: [this.loginService.administrador.id, [Validators.required]],
      id: [this.idOcupacion, [Validators.required]]
    });
  });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.ocupacionForm.get('id_grupo_ocupacional').value === 0) {
      return;
    }
    if (this.ocupacionForm.invalid) {
      return;
    }
    console.log(this.ocupacionForm.value);
    if (this.tipoOperacion === 'modificar') {
      this.ocupacionService.modificar(this.ocupacionForm.value, this.ocupacion.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Ocupacion', err.error.mensaje, 'error');
          });
    }else {
      this.ocupacionService.adicionar(this.ocupacionForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Ocupacion', err.error.mensaje, 'error');
          });
    }
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrupoOcupacionalService } from '../../../services/administrador/grupo-ocupacional.service';
import { GrupoOcupacional } from '../../../models/ocupacion/grupo-ocupacional.model';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-grupo-ocupacional',
  templateUrl: './formulario-grupo-ocupacional.component.html',
  styles: [
  ]
})
export class FormularioGrupoOcupacionalComponent implements OnInit {

  @Input() visible: boolean;
  @Input() idGrupo: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  cargarformulario = false;
  public formSubmitted = false;
  public grupoForm: FormGroup;
  public grupo: GrupoOcupacional;
  constructor(public grupoService: GrupoOcupacionalService,
              private fb: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit(): void {
      if (this.tipoOperacion === 'modificar') {
        this.cargarGrupo();
      }else{
        this.cargarformulario = true;
        this.grupoForm = this.fb.group({
        nombre: ['', [ Validators.required]],
  //      codigo: ['', [ Validators.required]],
        habilitado: [true, Validators.required],
        id_administrador: [this.loginService.administrador.id, [Validators.required]],
        });
      }
  }
  cargarGrupo(): void {
    this.grupoService.buscar(this.idGrupo)
    .subscribe((resp: any) => {
      this.grupo = resp;
      this.cargarformulario = true;
      this.grupoForm = this.fb.group({
      nombre: [this.grupo.nombre, [ Validators.required]],
  //    codigo: [this.grupo.codigo, [ Validators.required]],
      habilitado: [this.grupo.habilitado, Validators.required],
      id_administrador: [this.loginService.administrador.id, [Validators.required]],
      id: [this.grupo.id, [Validators.required]],
    });
  });
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.grupoForm.invalid) {
      return;
    }
    if (this.tipoOperacion === 'modificar') {
      this.grupoService.modificar(this.grupoForm.value, this.grupo.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Area laboral', err.mensaje, 'error');
          });
    }else {
      this.grupoService.adicionar(this.grupoForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Area laboral', err.mensaje, 'error');
          });
    }
  }
  campoNoValido( campo: string): boolean {
    if (this.grupoForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
}

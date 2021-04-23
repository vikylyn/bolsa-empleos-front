import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstudioAvanzado } from '../../../../../models/curriculum/estudio-avanzado.model';
import { Pais } from '../../../../../models/pais.model';
import { NivelEstudio } from '../../../../../models/estudio/nivel-estudio.model';
import { EstudioAvanzadoService } from '../../../../../services/solicitante/curriculum/estudio-avanzado.service';
import { UbicacionService } from '../../../../../services/ubicacion/ubicacion.service';
import { NivelEstudioService } from '../../../../../services/solicitante/curriculum/nivel-estudio.service';
import Swal from 'sweetalert2';
import { Ciudad } from '../../../../../models/ciudad.model';

@Component({
  selector: 'app-formulario-estudio-avanzado',
  templateUrl: './formulario-estudio-avanzado.component.html',
  styles: [
  ]
})
export class FormularioEstudioAvanzadoComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() idEstudio: number;
  @Input() tipoOperacion: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  cargandoModal = true;
  cargando = false;
  formSubmitted = false;
  estudioForm: FormGroup;
  estudio: EstudioAvanzado;
  paises: Pais[];
  niveles: NivelEstudio[];
  ciudades: Ciudad[] ;
  mostrarCampos = false;

  constructor(
          private fb: FormBuilder,
          private estudioService: EstudioAvanzadoService,
          private ubicacionService: UbicacionService,
          private nivelEstudioService: NivelEstudioService
    ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarNiveles();

    if (this.tipoOperacion === 'modificar') {
          this.cargarEstudio();
    }else{
          this.estudioForm = this.fb.group({
          institucion: ['' , [Validators.required]],
          carrera: ['' , [Validators.required]],
          fecha_inicio: ['' , [Validators.required]],
          fecha_fin: ['' , [Validators.required]],
          pais: ['' , [Validators.required]],
          estado: ['' , [Validators.required]],
          ciudad: ['' , [Validators.required]],
          id_pais: [1 , [Validators.required, Validators.min(1)]],
          id_ciudad: [null , [Validators.required, Validators.min(1)]],
          id_nivel_estudio: [0 , [Validators.required, Validators.min(1)]],
          id_curriculum: [this.idCurriculum]
          });
          this.cargandoModal = false;
    }
  }
  cargarNiveles(): void {
    this.nivelEstudioService.listar().subscribe((resp: NivelEstudio[]) => {
      this.niveles = resp;
    });
  }
  cargarPaises(): void {
    this.ubicacionService.listarPaises().subscribe((resp: Pais[]) => {
      this.paises = resp;
      this.cargarCiudades(this.paises[0].id);

    });
  }
  cargarCiudades(idPais: number): void {
    this.ciudades = [];
    this.ubicacionService.listarCiudades(idPais).subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }
  cargarEstudio(): void {
    console.log(this.idEstudio);
    this.estudioService.buscar(this.idEstudio)
      .subscribe((resp: EstudioAvanzado) => {
        this.estudio = resp;
        this.cargarCiudades(this.estudio.ciudad.estado.pais.id);
        if ( this.estudio.ciudad.estado.pais.id === 2 &&  this.estudio.otraCiudad) {
          this.mostrarCampos = true;
          this.estudioForm = this.fb.group({
            institucion: [this.estudio.institucion , [Validators.required]],
            carrera: [this.estudio.carrera , [Validators.required]],
            fecha_inicio: [ this.estudio.fecha_inicio , [Validators.required]],
            fecha_fin: [this.estudio.fecha_fin , [Validators.required]],
            pais: [this.estudio.otraCiudad.pais , [Validators.required]],
            estado: [this.estudio.otraCiudad.estado , [Validators.required]],
            ciudad: [ this.estudio.otraCiudad.ciudad , [Validators.required]],
            id_pais: [this.estudio.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]],
            id_ciudad: ['', [Validators.required, Validators.min(1)]],
            id_nivel_estudio: [this.estudio.nivel_estudio.id , [Validators.required, Validators.min(1)]],
            id_curriculum: [this.idCurriculum]
          });
          this.cargandoModal = false;
        }else {
          this.mostrarCampos = false;
          this.estudioForm = this.fb.group({
            institucion: [this.estudio.institucion , [Validators.required]],
            carrera: [this.estudio.carrera , [Validators.required]],
            fecha_inicio: [ this.estudio.fecha_inicio , [Validators.required]],
            fecha_fin: [this.estudio.fecha_fin , [Validators.required]],
            pais: ['' , [Validators.required]],
            estado: ['', [Validators.required]],
            ciudad: [ '' , [Validators.required]],
            id_pais: [this.estudio.ciudad.estado.pais.id, [Validators.required, Validators.min(1)]],
            id_ciudad: [this.estudio.ciudad.id, [Validators.required, Validators.min(1)]],
            id_nivel_estudio: [this.estudio.nivel_estudio.id , [Validators.required, Validators.min(1)]],
            id_curriculum: [this.idCurriculum]
          });
          this.cargandoModal = false;
        }
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.estudioForm.get(campo).invalid && this.estudioForm.get(campo).touched) {
      return true;
    }else if (this.estudioForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }
  guardar(): void {
    this.formSubmitted = true;
    console.log(this.estudioForm.value);

    if (!this.mostrarCampos) {
      this.estudioForm.get('ciudad').disable();
      this.estudioForm.get('estado').disable();
      this.estudioForm.get('pais').disable();
      this.estudioForm.get('id_ciudad').enable();
      this.estudioForm.value.ciudad = '';
      this.estudioForm.value.estado = '';
      this.estudioForm.value.pais = '';

    }else {
      this.estudioForm.get('ciudad').enable();
      this.estudioForm.get('estado').enable();
      this.estudioForm.get('pais').enable();
      this.estudioForm.get('id_ciudad').disable();
      this.estudioForm.value.id_ciudad = this.ciudades[0].id;

    }
    if (this.estudioForm.invalid) {
      return;
    }
    this.cargando = true;
    if (this.tipoOperacion === 'modificar') {
      this.estudioService.modificar(this.estudioForm.value, this.estudio.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al modificar Estudio Avanzado', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.estudioService.adicionar(this.estudioForm.value)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.cargando = false;
            this.cerrarModal();
          }, (err) => {
            console.log(err);
            this.cargando = false;
            Swal.fire('Error al adicionar Estudio Avanzado', err.error.mensaje, 'error');
          });
    }
  }
  cambiarPais(): void {
    let id = this.estudioForm.get('id_pais').value;
    if (id === 2) {
      this.mostrarCampos = true;
      this.estudioForm.get('ciudad').enable();
      this.estudioForm.get('estado').enable();
      this.estudioForm.get('pais').enable();
      this.estudioForm.get('id_ciudad').disable();
    }else {
      this.mostrarCampos = false;
      this.estudioForm.get('ciudad').disable();
      this.estudioForm.get('estado').disable();
      this.estudioForm.get('pais').disable();
      this.estudioForm.get('id_ciudad').enable();
      this.estudioForm.value.id_ciudad = this.ciudades[0].id;

    }
    this.cargarCiudades(parseInt(id));

  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
}

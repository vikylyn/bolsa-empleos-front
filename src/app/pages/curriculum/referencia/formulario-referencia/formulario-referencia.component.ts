import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Referencia } from '../../../../models/curriculum/referencia.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferenciaService } from '../../../../services/solicitante/curriculum/referencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-referencia',
  templateUrl: './formulario-referencia.component.html',
  styles: [
  ]
})
export class FormularioReferenciaComponent implements OnInit {
  cargarformulario = false;
  formSubmitted = false;
  referenciaForm: FormGroup;
  referencia: Referencia;
  tipo: string;
  id: number;
  id_curriculum: number;

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private fb: FormBuilder,
          private referenciaService: ReferenciaService
    ) { }

  ngOnInit(): void {

    this.route.queryParams
    .subscribe(params => {
        this.tipo = params.tipo;
        this.id = params.id;
        this.id_curriculum = params.id_curriculum;
        if (params.tipo === 'modificar') {
              this.cargarReferencia(params);
        }else{
              this.cargarformulario = true;
              this.referenciaForm = this.fb.group({
              nombre: ['' , [Validators.required]],
              apellidos: ['' , [Validators.required]],
              empresa: ['' , [Validators.required]],
              cargo: ['' , [Validators.required]],
              telefono: ['' , [Validators.required]],
              id_curriculum: [this.id_curriculum]
        });
      }
    });
  }

  cargarReferencia(params: any): void {
      console.log(params)
      this.referenciaService.buscar(params.id)
      .subscribe((resp: Referencia) => {
        console.log(resp);
        this.referencia = resp;
        this.cargarformulario = true;
        this.referenciaForm = this.fb.group({
        nombre: [this.referencia.nombre , [Validators.required]],
        apellidos: [this.referencia.apellidos , [Validators.required]],
        empresa: [this.referencia.empresa , [Validators.required]],
        cargo: [this.referencia.cargo , [Validators.required]],
        telefono: [this.referencia.telefono , [Validators.required]],
        id_curriculum: [this.id_curriculum]
      });
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.referenciaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
   }
  }
  guardar(): void {
    this.formSubmitted = true;
    if (this.referenciaForm.invalid) {
      return;
    }
    console.log(this.referenciaForm.value);
    if (this.tipo === 'modificar') {
      this.referenciaService.modificar(this.referenciaForm.value, this.referencia.id)
          .subscribe((resp: any) => {
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/referencia');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al modificar Referencia', err.error.error.error || err.error.error || err.error.mensaje, 'error');
          });
    }else {
     this.referenciaService.adicionar(this.referenciaForm.value)
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire(resp.mensaje, '', 'success');
            this.router.navigateByUrl('/curriculum/referencia');
          }, (err) => {
            console.log(err);
            Swal.fire('Error al adicionar Referencia', err.error.mensaje, 'error');
          });
    }
  }


}

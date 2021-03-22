import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Curriculum } from '../../../models/curriculum/curriculum.model';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-vista-completo',
  templateUrl: './vista-completo.component.html',
  styles: [
  ]
})
export class VistaCompletoComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() tipoOperacion: string;
  @Input() idSolicitante: number;
  // para enviar al componente operacion el id de una postulacion o contratacion
  @Input() idOperacion = 0;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  curriculum: Curriculum;
  cargando = true;
  constructor(private curriculumService: CurriculumService) { }

  ngOnInit(): void {
    console.log(this.tipoOperacion, this.idOperacion);
    this.curriculumService.buscarPorIdSolicitanteCompleto(this.idSolicitante)
        .subscribe(({curriculum}) => {
          this.cargando = false;
          this.curriculum = curriculum;
          console.log( this.curriculum);
        }, (err) => {
          Swal.fire(err.error.mensaje, '', 'error');
          console.log(err);
          this.cancelarModal();
        });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }

}

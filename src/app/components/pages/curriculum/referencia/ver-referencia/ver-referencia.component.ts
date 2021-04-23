import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReferenciaService } from '../../../../../services/solicitante/curriculum/referencia.service';
import { Referencia } from '../../../../../models/curriculum/referencia.model';

@Component({
  selector: 'app-ver-referencia',
  templateUrl: './ver-referencia.component.html',
  styles: [
  ]
})
export class VerReferenciaComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idReferencia: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  referencia: Referencia;
  cargandoModal = true;
  constructor(private referenciaService: ReferenciaService) {
   }

  ngOnInit(): void {
    this.cargarReferencia();

  }
  cargarReferencia(): void {
    this.referenciaService.buscar(this.idReferencia).subscribe(( resp: Referencia) => {
      this.referencia = resp;
      this.cargandoModal = false;
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

}

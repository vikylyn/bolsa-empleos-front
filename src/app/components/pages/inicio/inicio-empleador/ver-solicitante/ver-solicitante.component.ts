import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solicitante } from '../../../../../models/solicitante/solicitante.model';
import { SolicitanteService } from '../../../../../services/solicitante/solicitante.service';


@Component({
  selector: 'app-ver-solicitante',
  templateUrl: './ver-solicitante.component.html',
  styles: [
  ]
})
export class VerSolicitanteComponent implements OnInit {
  myModal = false;
  myModal2 = false;
  @Input() visible: boolean;
  @Input() idSolicitante: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();


  solicitante: Solicitante;
  cargando = true;
  constructor(
              private solicitanteService: SolicitanteService) {
              }

  ngOnInit(): void {
    this.cargarSolicitante();
  }



  cargarSolicitante(): void{
    this.solicitanteService.buscar(this.idSolicitante)
        .subscribe((resp: Solicitante) => {
          this.solicitante = resp;
          this.cargando = false;
        },(err) => { 
          this.cargando = false;
          console.log(err);
        });
  }

  mostrarModal(idSolicitante: number) {
    this.idSolicitante = idSolicitante;
    this.myModal = true;
  }
  cerrarModal() {
    this.cerrar.emit(false);
  }

  cerrarModal2(e) {
    this.myModal = e;
  }

  mostrarModalCurriculum(idSolicitante: number) {
    this.idSolicitante = idSolicitante;
    this.myModal2 = true;
  }
  cancelarModalCurriculum(e) {
    this.myModal2 = e;
  }

}

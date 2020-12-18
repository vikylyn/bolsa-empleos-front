import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solicitante } from '../../../../models/solicitante/solicitante.model';
import { SolicitanteService } from '../../../../services/solicitante/solicitante.service';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-ver-solicitante',
  templateUrl: './ver-solicitante.component.html',
  styles: [
  ]
})
export class VerSolicitanteComponent implements OnInit {
  myModal = false;
  @Input() visible: boolean;
  @Input() idSolicitante: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();


  solicitante: Solicitante;

  constructor(
              private solicitanteService: SolicitanteService,
              private loginService: LoginService) {
              }

  ngOnInit(): void {
    this.cargarSolicitante();
  }


  // cargar vacante por id, no contiene la empresa en caso de empleador con empresa
  cargarSolicitante(): void{
    this.solicitanteService.buscar(this.idSolicitante)
        .subscribe((resp: Solicitante) => {
          this.solicitante = resp;
          console.log(this.solicitante);
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

 

}

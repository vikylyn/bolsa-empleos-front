import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Administrador } from '../../../../models/administrador/administrador.model';
import { AdministradorService } from '../../../../services/administrador/administrador.service';

@Component({
  selector: 'app-ver-administrador',
  templateUrl: './ver-administrador.component.html',
  styles: [
  ]
})
export class VerAdministradorComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idAdministrador: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();

  administrador: Administrador;
  cargando = true;

  constructor(private administradorService: AdministradorService) {
  }

  ngOnInit(): void {
    this.cargarAdministrador();
  }
  cargarAdministrador(){
    this.administradorService.buscar(this.idAdministrador).subscribe((resp: Administrador) => {
      console.log(resp);
      this.administrador = resp;
      this.cargando = false;
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }
}

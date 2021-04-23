import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styles: [
  ]
})
export class CargandoComponent implements OnInit {
  @Input() tamanio: string;
  @Input() mensaje = 'Cargando...';
  @Input() rowclass = 'row justify-content-center animated fadeIn fast';
  constructor() { }

  ngOnInit(): void {
  }

}

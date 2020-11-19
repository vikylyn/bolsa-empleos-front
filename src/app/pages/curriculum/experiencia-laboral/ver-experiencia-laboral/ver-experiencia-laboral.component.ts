import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExperienciaLaboralService } from '../../../../services/solicitante/curriculum/experiencia-laboral.service';
import { ExperienciaLaboral } from '../../../../models/curriculum/experiencia-laboral.model';

@Component({
  selector: 'app-ver-experiencia-laboral',
  templateUrl: './ver-experiencia-laboral.component.html',
  styles: [
  ]
})
export class VerExperienciaLaboralComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idExperiencia: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();

  experiencia: ExperienciaLaboral;

  constructor(private experienciaService: ExperienciaLaboralService) {
   }

  ngOnInit(): void {
    this.cargarExperiencia();

  }
  cargarExperiencia(): void {
    this.experienciaService.buscar(this.idExperiencia).subscribe(( resp: ExperienciaLaboral) => {
      this.experiencia = resp;
      console.log(this.experiencia);
    });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }


}

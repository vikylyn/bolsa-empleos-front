import { Component, OnInit } from '@angular/core';
import { Curriculum } from 'src/app/models/curriculum/curriculum.model';
import { Solicitante } from '../../../models/solicitante/solicitante.model';
import { LoginService } from '../../../services/login.service';
import { SolicitanteService } from '../../../services/solicitante/solicitante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';

@Component({
  selector: 'app-administrar-curriculum',
  templateUrl: './administrar-curriculum.component.html',
  styles: [
  ]
})
export class AdministrarCurriculumComponent implements OnInit {
  curriculum: Curriculum;
  solicitante: Solicitante;
  constructor(private curriculumService: CurriculumService,
              private loginService: LoginService,
              private solicitanteService: SolicitanteService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.solicitanteService.buscar(this.loginService.solicitante.id).subscribe(( resp: Solicitante) => {
      this.solicitante = resp;
    });
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.curriculum = resp.curriculum;
      }
  });
  }

  accion(seccion: number): void {
    const posicionY = document.getElementById(`${seccion}`).getBoundingClientRect().top;
    window.scroll(0, posicionY);
  }
}

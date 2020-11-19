import { Component, OnInit } from '@angular/core';
import { Curriculum } from 'src/app/models/curriculum/curriculum.model';
import { Solicitante } from '../../../models/solicitante/solicitante.model';
import { LoginService } from '../../../services/login.service';
import { SolicitanteService } from '../../../services/solicitante/solicitante.service';
import { Router} from '@angular/router';
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
  // modal
  myModal = false;
  myModal2 = false;
  myModal3 = false;
  constructor(private curriculumService: CurriculumService,
              private loginService: LoginService,
              private solicitanteService: SolicitanteService,
              private router: Router) { }


  ngOnInit(): void {
    this.cargarSolicitante();
    this.cargarCurriculum();
  }
  cargarCurriculum(): void {
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.curriculum = resp.curriculum;
      }
    });
  }
  cargarSolicitante(): void {
    this.solicitanteService.buscar(this.loginService.solicitante.id).subscribe(( resp: Solicitante) => {
      this.solicitante = resp;
    });
  }
  // modal
  mostrarModal() {
    this.myModal = true;
  }

  mostrarModal2() {
    this.myModal2 = true;
  }
  mostrarModal3() {
    this.myModal3 = true;
  }

  cerrarModal(e) {
    this.myModal = e;
    this.cargarCurriculum();
  }
  cancelarModal(e) {
    this.myModal = e;
  }

  cerrarModal2(e) {
    this.myModal2 = e;
    this.cargarSolicitante();
  }
  cancelarModal2(e) {
    this.myModal2 = e;
  }
  cerrarModal3(e) {
    this.myModal3 = e;
  }
  cancelarModal3(e) {
    this.myModal3 = e;
  }
}

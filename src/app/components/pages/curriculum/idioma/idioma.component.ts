import { Component, OnInit } from '@angular/core';
import { CurriculumIdioma } from '../../../../models/curriculum/curriculum-idioma.model';
import { IdiomaService } from '../../../../services/solicitante/curriculum/idioma.service';
import { CurriculumService } from '../../../../services/solicitante/curriculum/curriculum.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styles: [
  ]
})
export class IdiomaComponent implements OnInit {
  myModal = false;
  myModal2 = false;
  idCurriculum: number;
  idIdioma: number;
  tipoOperacion: string;
  idiomas: CurriculumIdioma[];
  desde = 0;
  cargando = true;
  totalIdiomas = 0;


  constructor(private idiomaService: IdiomaService,
              private curriculumService: CurriculumService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.curriculumService.buscarPorIdSolicitante(this.loginService.solicitante.id).subscribe((resp: any) => {
      if (resp.ok === false) {
        this.router.navigateByUrl('/curriculum');
      }else {
        this.idCurriculum = resp.curriculum.id;
        this.cargarIdiomas();
      }
    });

  }
  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.totalIdiomas) {
      this.desde -= valor;
    }
    this.cargarIdiomas();
  }

  cargarIdiomas(): void {
    this.cargando = true;
    this.idiomaService.listar(this.idCurriculum, this.desde)
    .subscribe(({total, curriculums_idiomas}) => {
      this.idiomas = curriculums_idiomas;
      this.totalIdiomas = total;
      this.cargando = false;
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el idioma?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.idiomaService.eliminar(id).subscribe( (resp: any) => {
          Swal.fire(
            'Eliminado!',
            resp.mensaje,
            'success'
          );
          this.cargando = false;
          this.cargarIdiomas();
        }, (err) => {
          console.log(err);
          this.cargando = false;
          Swal.fire('Error al eliminar Idioma', err.error.error || err.error.mensaje, 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }


  mostrarModal(tipoOperacion: string, idIdioma: number) {
    this.tipoOperacion = tipoOperacion;
    this.idIdioma = idIdioma;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarIdiomas();
  }

  cancelarModal(e) {
    this.myModal = e;
  }
  mostrarModal2(idIdioma: number) {
    this.idIdioma = idIdioma;
    this.myModal2 = true;
  }
  cerrarModal2(e) {
    this.myModal2 = e;
  }
}

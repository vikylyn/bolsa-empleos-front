import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacante } from '../../../models/empleador/vacante.model';
import { VacanteService } from '../../../services/vacante/vacante.service';
import { EmpresaService } from '../../../services/empleador/empresa.service';
import { Empresa } from '../../../models/empleador/empresa.model';
import { PostulacionService } from '../../../services/vacante/postulacion.service';
import { LoginService } from '../../../services/login.service';
import { Postulacion } from '../../../models/empleador/postulacion.model';
import Swal from 'sweetalert2';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import { Contratacion } from '../../../models/empleador/contratacion.model';

@Component({
  selector: 'app-vacantes-solicitante',
  templateUrl: './vacantes-solicitante.component.html',
  styles: [
  ]
})
export class VacantesSolicitanteComponent implements OnInit {
  vacante: Vacante;
  postularme = true;
  aceptado = false;
  postulacion: Postulacion;
  contratado = false;
  contratacion: Contratacion;
  ocupado = false;
 // terminar = false;
  constructor(private route: ActivatedRoute,
              private vacanteService: VacanteService,
              private empresaService: EmpresaService,
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private contratacionService: ContratacionService,
              private router: Router) {
              }

  ngOnInit(): void {
    this.cargarVacante();
  }
  // verificar si el solicitante ya se postulo a la vacante
  verificarPostulacion(): void {
    this.postulacionService.buscarPorIdSolicitanteVacante(this.loginService.solicitante.id, this.vacante.id)
        .subscribe((resp: any) => {
          this.ocupado = resp.ocupado;
          this.postularme = resp.postulando;
          this.contratado = resp.contratado;
          this.postulacion = resp.postulacion;
          this.contratacion = resp.contratacion;
          this.aceptado = resp.aceptado;
        });
  }

  // cargar vacante por id, no contiene la empresa en caso de empleador con empresa
  cargarVacante(): void{
    this.vacanteService.buscar(this.route.snapshot.params.id)
        .subscribe((resp: Vacante) => {
          this.vacante = resp;
          this.verificarPostulacion();
          if (this.vacante.empleador.empresa) {
            this.cargarEmpresa();
          }
        });
  }

  // cargar la empresa en la vacante
  cargarEmpresa(): void {
    this.empresaService.buscarPorIdEmpleador(this.vacante.empleador.id)
        .subscribe((resp: Empresa) => {
          this.vacante.empresa = resp;
        });
  }

  postular(): void {
    const datos = {
                    id_solicitante: this.loginService.solicitante.id,
                    id_vacante: this.vacante.id
                  };
    Swal.fire({
      title: 'Desea de postular a la vacante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.postular(datos).subscribe( (resp: any ) => {
          this.postulacion = resp.postulacion;
          this.postularme = false;
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al postularme', err.error.error || err.error.mensaje, 'error');
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
  // eliminar la postulacion que no ha sido aceptada por el empleador
  cancelar(): void {

    Swal.fire({
      title: 'Estas seguro de cancelar su postulacion?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.eliminar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.postularme = true;
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar postulacion', err.error.error || err.error.mensaje, 'error');
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

  confirmar(): void {
    Swal.fire({
      title: 'Desea confirmar su postulacion?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.contratacionService.confirmar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.contratado = true;
          this.ocupado = true;
        }, (err) => {
          console.log(err);
          Swal.fire('Error al confirmar postulacion', err.error.error || err.error.mensaje, 'error');
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

  rechazar(): void {
    Swal.fire({
      title: 'Desea rechazar su postulacion?',
      text: 'Usted ha sido aceptado para la vacante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Rechazar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.contratacionService.rechazar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.contratado = false;
          this.aceptado = false;
          this.postulacion = null;
          this.contratacion = null;
          this.postularme = true;
        }, (err) => {
          console.log(err);
          Swal.fire('Error al confirmar postulacion', err.error.error || err.error.mensaje, 'error');
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
}

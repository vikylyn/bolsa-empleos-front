import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vacantes-solicitante',
  templateUrl: './vacantes-solicitante.component.html',
  styles: [
  ]
})
export class VacantesSolicitanteComponent implements OnInit, OnDestroy {

  @Input() visible: boolean;
  @Input() idVacante: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();


  vacante: Vacante;
  postulacion: Postulacion;
  contratacion: Contratacion;
  ocupado = false;
  verificacionSubscription: Subscription;
  postulando = false;
  constructor(
              private vacanteService: VacanteService,
              private empresaService: EmpresaService,
              private postulacionService: PostulacionService,
              private loginService: LoginService,
              private contratacionService: ContratacionService) {
              }

  ngOnInit(): void {
    this.cargarVacante();
    this.veririficarPostulacionWs();
  }
  veririficarPostulacionWs(): void {
    this.verificacionSubscription =  this.postulacionService.verificarPostulacion()
        .subscribe(( () => {
          this.verificarPostulacion();
        }));
  }
  // verificar si el solicitante ya se postulo a la vacante
  verificarPostulacion(): void {
    this.postulacionService.buscarPorIdSolicitanteVacante(this.loginService.solicitante.id, this.vacante.id)
        .subscribe((resp: any) => {
          console.log(resp);
          this.ocupado = resp.ocupado;
          this.postulacion = resp.postulacion;
          this.contratacion = resp.contratacion;
        });
  }

  cargarVacante(): void{
    this.vacanteService.buscar(this.idVacante)
        .subscribe((resp: Vacante) => {
          this.vacante = resp;
          this.verificarPostulacion();
        });
  }

  postular(): void {
    const datos = {
                    id_solicitante: this.loginService.solicitante.id,
                    id_vacante: this.vacante.id,
                    id_empleador: this.vacante.empleador.id
                  };
    console.log(datos);
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
          this.postulando = true;
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
          this.verificarPostulacion();
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
        this.postulacionService.confirmar(this.postulacion.id).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.verificarPostulacion();
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
          this.verificarPostulacion();
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

  cerrarModal() {
    this.cerrar.emit(false);
  }

  ngOnDestroy(): void {
    this.verificacionSubscription.unsubscribe();
  }
}

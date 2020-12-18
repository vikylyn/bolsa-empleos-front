import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { VacanteService } from '../../../../services/vacante/vacante.service';
import { Vacante } from '../../../../models/empleador/vacante.model';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import Swal from 'sweetalert2';
import { Notificacion } from '../../../../models/notificacion';

@Component({
  selector: 'app-invitacion-postulacion',
  templateUrl: './invitacion-postulacion.component.html',
  styles: [
  ]
})
export class InvitacionPostulacionComponent implements OnInit {


  @Input() visible: boolean;
  @Input() idSolicitante: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  vacantes: Vacante[];
  vacante: Vacante;
  cargando = true;
  cargarMensaje = false;
  idVacante: number;
  notificacion: Notificacion;
  constructor(
              private loginService: LoginService,
              private postulacionService: PostulacionService,
              private vacanteService: VacanteService) {
                this.cargarVacantes();

              }

  ngOnInit(): void {
  }

  cargarVacantes(): void {
    this.cargando = true;
    this.vacanteService.listarHabilitadasSinPaginacion(this.loginService.empleador.id)
    .subscribe(({vacantes}) => {
      this.vacantes = vacantes;
      if (this.vacantes.length === 0) {
        this.cargarMensaje = true;
      }else {
        this.vacante = this.vacantes[0];
        this.idVacante = this.vacantes[0].id;
        this.buscarInvitacion();
        this.cargando = false;
      }
    });
  }
  
  cerrarModal() {
    this.cerrar.emit(false);
  }
  cambiar(): void {
    this.vacante = this.vacantes.find( (element: Vacante) => element.id === this.idVacante);
    this.buscarInvitacion();
  }
  buscarInvitacion(): void {
    this.cargando = true;
    this.postulacionService.buscarInvitacion(this.idSolicitante, this.idVacante).subscribe((resp: Notificacion)=> {
      this.notificacion = resp;
      this.cargando = false;
    }, (err) => {
          console.log(err);
          this.notificacion = null;
          this.cargando = false;
    });
  }
  invitar(): void {
    let form = {
      id_vacante: this.vacante.id,
      id_solicitante: this.idSolicitante,
      id_empleador: this.loginService.empleador.id
    }
    Swal.fire({
      title: 'Desea invitar al solicitante a postularse a la vacante?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.invitarPostulacion(form).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error al invitar a postularse', err.error.error || err.error.mensaje, 'error');
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

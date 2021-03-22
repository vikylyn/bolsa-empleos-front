import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notificacion } from '../../../../models/notificacion';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { NotificacionService } from '../../../../services/notificacion/notificacion.service';
import { Router } from '@angular/router';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';
import { Contratacion } from '../../../../models/empleador/contratacion.model';

@Component({
  selector: 'app-notificacion-empleador',
  templateUrl: './notificacion-empleador.component.html',
  styles: [
  ]
})
export class NotificacionEmpleadorComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idNotificacion: number;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  notificacion: Notificacion;
  myModal = false;
  postulacion: Postulacion;
  cargando = true;
  notificacionEliminada = false;
  contratacion: Contratacion;
  constructor(private notificacionService: NotificacionService,
              private router: Router,
              private postulacionService: PostulacionService,
              private loginService: LoginService) {
              }

  ngOnInit(): void {

    this.notificacionService.buscar(this.idNotificacion,
          this.loginService.empleador.credenciales.rol.id).subscribe((resp: Notificacion) => {
            this.notificacion = resp;
            this.cargarPostulacion();
          }, (err) => {
            Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
            console.log(err);
            this.notificacionEliminada = true;
            this.cargando = false;
    });
  }

  cargarNotificacion(): void {
    this.notificacionService.buscar(this.idNotificacion,
      this.loginService.empleador.credenciales.rol.id).subscribe((resp: Notificacion) => {
        this.notificacion = resp;
        this.cargarPostulacion();
      }, (err) => {
        Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
        console.log(err);
        this.router.navigateByUrl('/postulaciones-empleador');
      });
  }
  cargarPostulacion(): void {
    this.postulacionService.buscarPorIdSolicitanteVacante(this.notificacion.solicitante.id, this.notificacion.vacante.id)
    .subscribe((resp: any) => {
      this.postulacion = resp.postulacion;
      this.contratacion = resp.contratacion;
      this.cargando = false;
    }, (err) => {
      Swal.fire(err.error.mensaje, 'Error al buscar postulacion' , 'error');
      console.log(err);
    //  this.router.navigateByUrl('/postulaciones-empleador');
    });
  }
  mostrarModal() {
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarPostulacion();
  }
  cancelarModal(e) {
    this.myModal = e;
  }

  cerrarModalPadre() {
    this.cerrar.emit(false);
  }

}

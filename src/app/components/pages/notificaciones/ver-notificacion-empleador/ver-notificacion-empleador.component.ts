import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../../../../models/notificacion';
import { LoginService } from '../../../../services/login.service';
import { NotificacionService } from '../../../../services/notificacion/notificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Postulacion } from '../../../../models/empleador/postulacion.model';
import { PostulacionService } from '../../../../services/vacante/postulacion.service';
import Swal from 'sweetalert2';
import { Contratacion } from '../../../../models/empleador/contratacion.model';

@Component({
  selector: 'app-ver-notificacion-empleador',
  templateUrl: './ver-notificacion-empleador.component.html',
})
export class VerNotificacionEmpleadorComponent implements OnInit {
  notificacion: Notificacion;
  myModal = false;
  postulacion: Postulacion;
  cargando = true;
  notificacionEliminada = false;
  contratacion: Contratacion;
  constructor(private notificacionService: NotificacionService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private postulacionService: PostulacionService,
              private loginService: LoginService) {
              }

  ngOnInit(): void {
  //  this.cargarNotificacion();
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.cargando = true;
        this.notificacionService.buscar(params.id,
          this.loginService.empleador.credenciales.rol.id).subscribe((resp: Notificacion) => {
            this.notificacion = resp;
            this.cargarPostulacion();
          }, (err) => {
            Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
            console.log(err);
            this.notificacionEliminada = true;
            this.cargando = false;
          //  this.router.navigateByUrl('/postulaciones-empleador');
          });
      }
    );
  }

  cargarNotificacion(): void {
    this.cargando = true;
    this.notificacionService.buscar(this.activatedRoute.snapshot.params.id,
      this.loginService.empleador.credenciales.rol.id).subscribe((resp: Notificacion) => {
        this.notificacion = resp;
        this.cargarPostulacion();
      }, (err) => {
        Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
        console.log(err);
        this.cargando = false;
        this.router.navigateByUrl('/postulaciones-empleador');
      });
  }
  cargarPostulacion(): void {
    this.cargando = true;
    this.postulacionService.buscarPorIdSolicitanteVacante(this.notificacion.solicitante.id, this.notificacion.vacante.id)
    .subscribe((resp: any) => {
      this.postulacion = resp.postulacion;
      this.contratacion = resp.contratacion;
      this.cargando = false;
    }, (err) => {
      Swal.fire(err.error.mensaje, 'Error al buscar postulacion' , 'error');
      console.log(err);
      this.cargando = false;
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
}

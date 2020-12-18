import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../../../models/notificacion';
import { Contratacion } from '../../../models/empleador/contratacion.model';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContratacionService } from '../../../services/vacante/contratacion.service';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { PostulacionService } from '../../../services/vacante/postulacion.service';

@Component({
  selector: 'app-ver-notificacion-contratacion-empleador',
  templateUrl: './ver-notificacion-contratacion-empleador.component.html',
  styles: [
  ]
})
export class VerNotificacionContratacionEmpleadorComponent implements OnInit {

  notificacion: Notificacion = null;
  myModal = false;
  contratacion: Contratacion = null;
  cargarVista = false;
  cargarMensaje = false;
  cargando = true;
  notificacionEliminada = false;

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
        this.notificacionService.buscar(params.id,
          this.loginService.empleador.credenciales.rol.id).subscribe((resp: Notificacion) => {
            this.notificacion = resp;
            this.cargarContratacion();
          }, (err) => {
            Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
            console.log(err);
            this.notificacionEliminada = true;
            this.cargando = false;
           // this.router.navigateByUrl('/postulaciones-empleador');
          });
      }
    );
  }

  cargarNotificacion(): void {
    this.notificacionService.buscar(this.activatedRoute.snapshot.params.id,
      this.loginService.empleador.credenciales.rol.id).subscribe((resp: Notificacion) => {
        this.notificacion = resp;
        this.cargarContratacion();
      }, (err) => {
        Swal.fire(err.error.mensaje, 'Error al buscar notificacion' , 'error');
        console.log(err);
        this.router.navigateByUrl('/contrataciones-empleador');
      });
  }
  cargarContratacion(): void {
    this.postulacionService.buscarPorIdSolicitanteVacante(this.notificacion.solicitante.id, this.notificacion.vacante.id)
    .subscribe((resp: any) => {
      this.contratacion = resp.contratacion;
      this.cargando = false;
      if (!this.contratacion){
        this.cargarMensaje = true;
        this.cargarVista = false;
      }else if (this.contratacion.habilitado){
        this.cargarVista = true;
        this.cargarMensaje = false;
      } else {
        this.cargarMensaje = true;
        this.cargarVista = false;
      }
    }, (err) => {
      Swal.fire(err.error.mensaje, 'Error al buscar contratacion' , 'error');
      console.log(err);
    //  this.router.navigateByUrl('/postulaciones-empleador');
    });
  }
  mostrarModal() {
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
    this.cargarContratacion();
  }
  cancelarModal(e) {
    this.myModal = e;
  }
}

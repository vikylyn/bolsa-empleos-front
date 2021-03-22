import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-notificaciones-empleador',
  templateUrl: './lista-notificaciones-empleador.component.html',
  styles: [
  ]
})
export class ListaNotificacionesEmpleadorComponent implements OnInit {
  myModal = false;

  idNotificacion: number;
  notificaciones: Notificacion[];
  desde = 0; 
  cargando = true;
  total = 0;
  leidas = 0;
  noLeidas = 0;

  constructor(private notificacionService: NotificacionService,
              private router: Router,
              public loginService: LoginService) {
                this.cargarNotificaciones();

              }

  ngOnInit(): void {
  }
  cargarNotificaciones(): void {
    this.notificacionService.listarConPaginacion(this.loginService.empleador.id, this.loginService.empleador.credenciales.rol.id,this.desde)
    .subscribe(({total, notificaciones, totalNoLeidas}) => {

      this.notificaciones = notificaciones;
      this.total = total;
      this.noLeidas = totalNoLeidas;
    });
  }
  leerNotificacion(idNotificacion: number, leido: boolean): void {
    if (!leido) {
      this.notificacionService.leerNotificacion(idNotificacion, this.loginService.empleador.credenciales.rol.id)
      .subscribe((resp: any) => {
        this.mostrarModal(idNotificacion);
        this.cargarNotificaciones();
      });
    }else {
      this.mostrarModal(idNotificacion);
    }

  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde >= this.total) {
      this.desde -= valor;
    }
    this.cargarNotificaciones();
  }
  eliminar(idNotificacion: number): void {
    Swal.fire({
      title: 'Desea eliminar esta notificación?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.notificacionService.eliminar(idNotificacion, this.loginService.empleador.credenciales.rol.id).subscribe( (resp: any ) => {
          Swal.fire(resp.mensaje, '', 'success');
          this.cargarNotificaciones();
          this.cargando = false;
        }, (err) => {
          console.log(err);
          Swal.fire('Error al eliminar notificacion', err.error.error || err.error.mensaje, 'error');
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
  mostrarModal(idNotificacion: number) {
    this.idNotificacion = idNotificacion;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
  }
}

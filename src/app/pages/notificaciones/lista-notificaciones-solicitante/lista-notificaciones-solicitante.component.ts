import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Notificacion } from '../../../models/notificacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-notificaciones-solicitante',
  templateUrl: './lista-notificaciones-solicitante.component.html',
  styles: [
  ]
})
export class ListaNotificacionesSolicitanteComponent implements OnInit {
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
    this.notificacionService.listarConPaginacion(this.loginService.solicitante.id, this.loginService.solicitante.credenciales.rol.id, this.desde)
    .subscribe(({total, notificaciones, totalNoLeidas}) => {

      this.notificaciones = notificaciones;
      this.total = total;
      this.noLeidas = totalNoLeidas;
    });
  }

  leerNotificacion(idNotificacion: number, leido: boolean, tipoNotificacion: string ): void {
    
    // hay que cambiar para que acepte a ambos usuario solicitante y empleador
    if (!leido) {
      this.notificacionService.leerNotificacion(idNotificacion, this.loginService.solicitante.credenciales.rol.id)
      .subscribe((resp: any) => {
        this.mostrarModal(idNotificacion);
        this.cargarNotificaciones();
      });
    }else {
      this.mostrarModal(idNotificacion);
    }

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
        this.notificacionService.eliminar(idNotificacion, this.loginService.solicitante.credenciales.rol.id).subscribe( (resp: any ) => {
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
  mostrarModal(idNotificacion: number) {
    this.idNotificacion = idNotificacion;
    this.myModal = true;
  }
  cerrarModal(e) {
    this.myModal = e;
  }
}

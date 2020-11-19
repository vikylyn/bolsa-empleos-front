import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../login.service';
import { Solicitante } from '../../models/solicitante/solicitante.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;

  constructor(
    private socket: Socket,
    private loginService: LoginService
  ) { 
    this.checkStatus();
    this.loginWS();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketStatus = false;
    });
  }
  emitir(evento: string, payload?: any, callback?: Function) {
    console.log( 'emitiendo mensaje' );
    this.socket.emit(evento, payload, callback);

  }

  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS() {
    return new Promise( (resolve, reject ) => {
      if (this.loginService.solicitante && !this.loginService.empleador) {
        console.log('configurando', this.loginService.solicitante.nombre);
        let nombre = this.loginService.solicitante.nombre;
        this.emitir( 'configurar-usuario',  {idUsuario: this.loginService.solicitante.id,
                                             nombre: this.loginService.solicitante.nombre
                                             + ' ' + this.loginService.solicitante.apellidos,
                                             rol: this.loginService.solicitante.credenciales.rol.nombre} , (resp) => {
          resolve();
          console.log(resp);
        });
      }
      if (this.loginService.empleador && !this.loginService.solicitante) {
        console.log('configurando', this.loginService.empleador.nombre);
        this.emitir( 'configurar-usuario',  {idUsuario: this.loginService.empleador.id,
                                             nombre: this.loginService.empleador.nombre
                                             + ' ' + this.loginService.empleador.apellidos,
                                             rol: this.loginService.empleador.credenciales.rol.nombre} , (resp) => {
          resolve();
          console.log(resp);
        });
      }

    });
  }

  logoutWS(): void {
    const payload =  {
      idUsuario: 0,
      nombre: 'sin-nombre',
      rol: 'sin-rol'
    };
    this.emitir( 'configurar-usuario', payload, () => {});
  }

}

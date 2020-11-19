import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WebsocketService } from '../websocket/websocket.service';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private http: HttpClient,
              public wsService: WebsocketService) { }

  listarNoleidas( idUsuario: number, idRol: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/notificacion/${idUsuario}/${idRol}?token=${token}`)
               .pipe( map( (resp: any) => resp.notificaciones));
  }
  contarNoleidas( idUsuario: number, idRol: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/notificacion/total/${idUsuario}/${idRol}?token=${token}`)
               .pipe( map( (resp: any) => resp.total));
  }
  leerNotificacion( idNotificacion: number, idRol: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/notificacion/${idNotificacion}/${idRol}?token=${token}`, {});
  }

  // websockets

  recibirNotificacionesNuevas() {
    return  this.wsService.escuchar('notificacion-nueva');
  }

  recibirTotalNoLeidas() {
    return this.wsService.escuchar('total-no-leidas');
  }
  // para cargar Informacion del usuario cuando este la modifique
  actualizarUsuario(): any {
    return this.wsService.escuchar('actualizando-usuario');
  }
}

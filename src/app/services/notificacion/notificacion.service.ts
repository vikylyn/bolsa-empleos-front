import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { WebsocketService } from '../websocket/websocket.service';
import { Notificacion } from '../../models/notificacion';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private http: HttpClient,
              public wsService: WebsocketService) { }
  // renombrar a listar y contar porque el api devuelve todo no solo no leidas
  listar( idUsuario: number, idRol: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/notificacion/${idUsuario}/${idRol}?token=${token}`)
               .pipe( map( (resp: any) => resp.notificaciones));
  }
  listarConPaginacion( idUsuario: number, idRol: number,desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total:number, notificaciones:Notificacion [],totalNoLeidas: number}>(`${base_url}/notificacion/paginacion/${idUsuario}/${idRol}/${desde}?token=${token}`);
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
  // buscar notificacion
  buscar( idNotificacion: number, idRol: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/notificacion/buscar/${idNotificacion}/${idRol}?token=${token}`)
               .pipe( map( (resp: any) => resp.notificacion), delay(300));
  }
 // buscar notificacion
  eliminar( idNotificacion: number, idRol: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/notificacion/${idNotificacion}/${idRol}?token=${token}`);
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

  // para cargar la informacion de la aplicacion cuando esta la modifique (logo y demas datos)
  actualizarInformacionApp(): any {
    return this.wsService.escuchar('actualizando-informacion-app');
  }
}

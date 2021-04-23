import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Postulacion } from '../../models/empleador/postulacion.model';
import { WebsocketService } from '../websocket/websocket.service';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  constructor(private http: HttpClient,
              public wsService: WebsocketService) { }

  buscar( idPostulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulacion: Postulacion}>(`${base_url}/postulacion/${idPostulacion}?token=${token}`);
  }
  postular(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/postulacion?token=${token}`, formData);
  }
  // buscar si el solicitante ya postulo a una vacante, si  esta aceptado o contratado
  buscarPorIdSolicitanteVacante( id_solicitante: number, id_vacante: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/postulacion/${id_solicitante}/${id_vacante}?token=${token}`);
  }
  // eliminar postulacion por parte de un solicitante ( la postulacion  no ha sido aceptada por el empleador )
  eliminar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/postulacion/${id_postulacion}?token=${token}`);
  }
    // eliminar logicamente la postulacion rechazada por el solicitante
  eliminarRechazadoSolicitante(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/eliminacion-rechazado-solicitante/${id_postulacion}?token=${token}`, {});
  }
  // aceptar postulacion por parte de un empleador
  aceptar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/aceptar/${id_postulacion}?token=${token}`, {});
  }
    // aceptar postulacion que ha sido rechazada por parte de un empleador
 /* aceptarRechazado(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/aceptar-rechazado/${id_postulacion}?token=${token}`, {});
  }
*/
  // confirmar  postulacion que ha sido aceptada (solicitante)
  confirmar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/confirmar/${id_postulacion}?token=${token}`, {});
  }
  // rechazar postulacion por parte de un empleador ( la postulacion  no ha sido aceptada por el empleador )
  rechazarPostulacionEmpleador(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/rechazar-empleador/${id_postulacion}?token=${token}`, {});
  }

  rechazarPostulacionSolicitante(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/rechazar-solicitante/${id_postulacion}?token=${token}`, {});
  }

  // rechazar postulacion por parte de un empleador ( la postulacion  ha sido aceptada por el empleador )
  rechazarAceptado(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/rechazar-aceptado/${id_postulacion}?token=${token}`, {});
  }

  // listar postulaciones mediante id de Solicitante
  listarPendientesPorIdSolicitante(id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista-pendientes/solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }
  // listar postulaciones conisiderados por id de Solicitante
  listarConsideradosPorIdSolicitante(id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista-considerados/solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }

  // listar postulaciones mediante id de Solicitante
  listarRechazadasPorIdSolicitante(id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista-rechazados/solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }
  // listar postulaciones consideradas por id de Vacante
  listarConsideradosPorIdVacante(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista-considerados/empleador/${id_vacante}?desde=${desde}&token=${token}`);
  }

  // listar postulaciones sin considerar por id de Vacante
  listarNoConsideradosPorIdVacante(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista-no-considerados/empleador/${id_vacante}?desde=${desde}&token=${token}`);
  }

  // listar postulaciones rechazadas por id de Vacante
  listarRechazadasPorIdVacante(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista-rechazados/empleador/${id_vacante}?desde=${desde}&token=${token}`);
  }

   // listar postulaciones favoritas por id de Vacante
   listarPorIdVacanteFavoritos(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>
      (`${base_url}/postulacion/favoritos/${id_vacante}?desde=${desde}&token=${token}`);
  }

  busquedaPendientesEmpleador(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-pendientes-empleador/${id_empleador}/${valor}?token=${token}`);
  }
  busquedaConsideradosEmpleador(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-considerados-empleador/${id_empleador}/${valor}?token=${token}`);
  }
  busquedaRechazadosEmpleador(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-rechazados-empleador/${id_empleador}/${valor}?token=${token}`);
  }
  busquedaFavoritosEmpleador(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-favoritos-empleador/${id_empleador}/${valor}?token=${token}`);
  }

  busquedaPendientesSolicitante(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-pendientes-solicitante/${id_empleador}/${valor}?token=${token}`);
  }
  busquedaAceptadosSolicitante(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-aceptados-solicitante/${id_empleador}/${valor}?token=${token}`);
  }
  busquedaRechazadosSolicitante(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda-rechazados-solicitante/${id_empleador}/${valor}?token=${token}`);
  }

  // asignar postulacion como favorito
  asignarFavorito(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/favorito/${id_postulacion}?token=${token}`, {});
  }

  // asignar postulacion como favorito
  quitarFavorito(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/quitar-favorito/${id_postulacion}?token=${token}`, {});
  }
  // invitar a solicitante a postularse
  invitarPostulacion(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/postulacion/invitacion?token=${token}`, formData);
  }
  // invitar a solicitante a postularse
  buscarInvitacion(idSolicitante: number, idVacante: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/postulacion/invitacion/${idSolicitante}/${idVacante}?token=${token}`)
            .pipe(map((resp: any)=> resp.notificacion));
  }
  // websockets

  verificarPostulacion() {
    return  this.wsService.escuchar('verificar-postulacion');
  }

  actualizarPostulaciones() {
    return  this.wsService.escuchar('actualizar-postulaciones');
  }
}

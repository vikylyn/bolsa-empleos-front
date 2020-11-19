import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Postulacion } from '../../models/empleador/postulacion.model';
import { WebsocketService } from '../websocket/websocket.service';


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
  // aceptar postulacion por parte de un empleador
  aceptar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/aceptar/${id_postulacion}?token=${token}`, {});
  }

  // confirmar  postulacion que ha sido aceptada (solicitante)
  confirmar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/confirmar/${id_postulacion}?token=${token}`, {});
  }
  // rechazar postulacion por parte de un empleador ( la postulacion  no ha sido aceptada por el empleador )
  rechazar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/postulacion/rechazar/${id_postulacion}?token=${token}`, {});
  }

  // listar postulaciones mediante id de Solicitante
  listarPorIdSolicitante(id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista/solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }
  // listar postulaciones mediante id de Vacante
  listarPorIdVacante(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, postulaciones: Postulacion[]}>(`${base_url}/postulacion/lista/empleador/${id_vacante}?desde=${desde}&token=${token}`);
  }

  busqueda(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{postulaciones: Postulacion[]}>(`${base_url}/postulacion/busqueda/${id_empleador}/${valor}?token=${token}`);
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

  // websockets

  verificarPostulacion() {
    return  this.wsService.escuchar('verificar-postulacion');
  }
}

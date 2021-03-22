import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Contratacion } from '../../models/empleador/contratacion.model';
import { WebsocketService } from '../websocket/websocket.service';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ContratacionService {

  constructor(private http: HttpClient,
              public wsService: WebsocketService) { }
  buscar(id_contratacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{contratacion: Contratacion}>(`${base_url}/contratacion/${id_contratacion}?token=${token}`);
  }
  
  rechazar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/contratacion/rechazar/${id_postulacion}?token=${token}`);
  }
  ocultar(id_contratacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/contratacion/oculto/${id_contratacion}?token=${token}`, {});
  }
  desvincularSolicitante(id_contratacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/contratacion/desvincular/${id_contratacion}?token=${token}`, {});
  }

  listarPorIdSolicitante(id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, contrataciones: Contratacion[]}>(`${base_url}/contratacion/lista-solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }

  listarPorIdEmpleador(idEmpleador: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, contrataciones: Contratacion[]}>(`${base_url}/contratacion/lista-empleador/${idEmpleador}?desde=${desde}&token=${token}`);
  }
/*
  listarPorIdVacante(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{contrataciones: Contratacion[]}>(`${base_url}/contratacion/lista/${id_vacante}?desde=${desde}&token=${token}`);
  }
*/
  busqueda(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{contrataciones: Contratacion[]}>(`${base_url}/contratacion/busqueda/${id_empleador}/${valor}?token=${token}`);
  }


  actualizarContrataciones() {
    return  this.wsService.escuchar('actualizar-contrataciones');
  }
}

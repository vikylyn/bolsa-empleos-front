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

  busquedaEmpleador(valor: string, id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{contrataciones: Contratacion[]}>(`${base_url}/contratacion/busqueda-empleador/${id_empleador}/${valor}?token=${token}`);
  }
  busquedaSolicitante(valor: string, id_solicitante: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{contrataciones: Contratacion[]}>(`${base_url}/contratacion/busqueda-solicitante/${id_solicitante}/${valor}?token=${token}`);
  }
  actualizarContrataciones(): any {
    return  this.wsService.escuchar('actualizar-contrataciones');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Contratacion } from '../../models/empleador/contratacion.model';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ContratacionService {

  constructor(private http: HttpClient) { }

  contratar(id_postulacion): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/contratacion/${id_postulacion}?token=${token}`, {});
  }
  confirmar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/contratacion/confirmacion/${id_postulacion}?token=${token}`, {});
  }

  rechazar(id_postulacion: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/contratacion/rechazar/${id_postulacion}?token=${token}`);
  }

  terminar(): any {

  }

  listarPorIdSolicitante(id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, contrataciones: Contratacion[]}>(`${base_url}/contratacion/lista-solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }

  listarPorIdVacante(id_vacante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{contrataciones: Contratacion[]}>(`${base_url}/contratacion/lista/${id_vacante}?desde=${desde}&token=${token}`);
  }
}

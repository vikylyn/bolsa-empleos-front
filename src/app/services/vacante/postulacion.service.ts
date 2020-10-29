import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Postulacion } from '../../models/empleador/postulacion.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  constructor(private http: HttpClient) { }


  postular(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/postulacion?token=${token}`, formData);
  }
  // buscar si el solicitante ya postulo a una vacante, si  esta aceptado o contratado
  buscarPorIdSolicitanteVacante( id_solicitante: number, id_vacante: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/postulacion/${id_solicitante}/${id_vacante}?token=${token}`);
  }
  // eliminar postulacion que no ha sido aceptada por el empleador
  eliminar(id_postulacion): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/postulacion/${id_postulacion}?token=${token}`);
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcupacionSolicitante } from '../../models/ocupacion/ocupacion-solicitante';

import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OcupacionSolicitanteService {

  constructor(private http: HttpClient ) { }
  // listar paginado
  listar( id_solicitante: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, ocupaciones: OcupacionSolicitante[]}>(`${base_url}/ocupacion-solicitante/${id_solicitante}?desde=${desde}&token=${token}`);
  }

  // Habilitar ocupacion
  habilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/ocupacion-solicitante/habilitar/${id}?token=${token}`, {});
  }
  // Inhabilitar ocupacion
  inhabilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/ocupacion-solicitante/inhabilitar/${id}?token=${token}`, {});
  }

  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/ocupacion-solicitante?token=${token}`, formData);
  }
}

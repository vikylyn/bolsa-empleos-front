import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Curriculum } from '../../../models/curriculum/curriculum.model';
import { Postulacion } from 'src/app/models/empleador/postulacion.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private http: HttpClient) { }
  // buscar por id incompleto solo con la relacion con solicitante
  buscarPorIdSolicitante(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/curriculum/solicitante/${id}?token=${token}`);
  }
  // Curriculum completo (experiencias laborales, estudios , idiomas ,etc)
  buscarPorIdSolicitanteCompleto(id_solicitante: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{curriculum: Curriculum}>(`${base_url}/curriculum/completo/${id_solicitante}?token=${token}`);
  }

  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/curriculum?token=${token}`, formData);
  }
  modificar(id: number, formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/curriculum/${id}?token=${token}`, formData);
  }
}

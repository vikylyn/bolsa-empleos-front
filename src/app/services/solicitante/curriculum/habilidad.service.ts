import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Habilidad } from '../../../models/curriculum/habilidad.model';
import { CurriculumHabilidad } from '../../../models/curriculum/curriculum-habilidad.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  constructor(private http: HttpClient) { }
  // Lista de las habilidades a seleccionar
  listarTodas(): any {
    const token = localStorage.getItem('token');
    return this.http.get<{habilidades: Habilidad[]}>(`${base_url}/habilidad?token=${token}`);
  }
  // Listar las habilidades asignadas a un curriculum
  listar(id_curriculum: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, habilidades: CurriculumHabilidad[]}>(`${base_url}/curriculum/habilidad/lista/${id_curriculum}?desde=${desde}&token=${token}`);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/curriculum/habilidad?token=${token}`, formData);
  }
    // busqueda por id
  buscar(id: number): any{
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/curriculum/habilidad/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.curriculum_habilidad));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/curriculum/habilidad/${id}?token=${token}`, formData);
  }
  eliminar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/curriculum/habilidad/${id}?token=${token}`);
  }
}
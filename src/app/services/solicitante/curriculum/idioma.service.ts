import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Idioma } from '../../../models/idioma/idioma.model';
import { NivelIdioma } from '../../../models/idioma/nivel-idioma.model';
import { map } from 'rxjs/operators';
import { CurriculumIdioma } from '../../../models/curriculum/curriculum-idioma.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(private http: HttpClient) { }
  // Lista de Idiomas
  listarIdiomas(): any {
    const token = localStorage.getItem('token');
    return this.http.get<{curriculums_idiomas: Idioma[]}>(`${base_url}/idioma?token=${token}`);
  }
  listarIdiomasNoAsigandos(idCurriculum: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{curriculums_idiomas: Idioma[]}>(`${base_url}/idioma/lista/${idCurriculum}?token=${token}`);
  }
  // Lista de Niveles de Idioma
  listarNiveles(): any {
    const token = localStorage.getItem('token');
    return this.http.get<{niveles_idioma: NivelIdioma[]}>(`${base_url}/idioma/nivel?token=${token}`);
  }
  // lista de idiomas asignados a un Curriculum
  listar(id_curriculum: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, idiomas: CurriculumIdioma[]}>(`${base_url}/curriculum/idioma/lista/${id_curriculum}?desde=${desde}&token=${token}`);
  }
  // adicionar idiomas a un curriculum
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/curriculum/idioma?token=${token}`, formData);
  }
  // buscar idioma asignado a un curriculum
  buscar(id: number): any{
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/curriculum/idioma/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.curriculum_idioma));
  }
  // modificar idioma asignado a un curriculum
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/curriculum/idioma/${id}?token=${token}`, formData);
  }
  // eliminar idioma asignado a un curriculum
  eliminar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/curriculum/idioma/${id}?token=${token}`);
  }
}

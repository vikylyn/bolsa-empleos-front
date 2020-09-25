import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ExperienciaLaboral } from '../../../models/curriculum/experiencia-laboral.model';import { Habilidad } from '../../../models/curriculum/habilidad.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  constructor(private http: HttpClient) { }

  listar(id_curriculum: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, experiencias: ExperienciaLaboral[]}>(`${base_url}/experiencia/listar/${id_curriculum}?desde=${desde}&token=${token}`);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/experiencia?token=${token}`, formData);
  }
    // busqueda por id
  buscar(id: number): any{
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/experiencia/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.experiencia));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/experiencia/${id}?token=${token}`, formData);
  }
  eliminar(id: number): any {
    console.log(id);
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/experiencia/${id}?token=${token}`);
  }
}

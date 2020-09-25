import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { EstudioBasico } from '../../../models/curriculum/estudio-basico.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EstudioBasicoService {

  constructor(private http: HttpClient) { }

  listar(id_curriculum: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, estudios_basicos: EstudioBasico[]}>(`${base_url}/curriculum/estudio-basico/lista/${id_curriculum}?desde=${desde}&token=${token}`);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/curriculum/estudio-basico?token=${token}`, formData);
  }
  buscar(id: number): any{
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/curriculum/estudio-basico/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.estudio));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/curriculum/estudio-basico/${id}?token=${token}`, formData);
  }
  eliminar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/curriculum/estudio-basico/${id}?token=${token}`);
  }
}

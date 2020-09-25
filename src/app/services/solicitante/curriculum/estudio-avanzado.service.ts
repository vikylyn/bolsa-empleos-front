import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { EstudioAvanzado } from '../../../models/curriculum/estudio-avanzado.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstudioAvanzadoService {


  constructor(private http: HttpClient) { }

  listar(id_curriculum: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, estudios_avanzados: EstudioAvanzado[]}>(`${base_url}/curriculum/estudio-avanzado/lista/${id_curriculum}?desde=${desde}&token=${token}`);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/curriculum/estudio-avanzado?token=${token}`, formData);
  }
  buscar(id: number): any{
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/curriculum/estudio-avanzado/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.estudio));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/curriculum/estudio-avanzado/${id}?token=${token}`, formData);
  }
  eliminar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/curriculum/estudio-avanzado/${id}?token=${token}`);
  }
}

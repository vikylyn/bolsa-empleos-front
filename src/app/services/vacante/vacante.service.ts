import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from '../../models/empleador/vacante.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  constructor(private http: HttpClient) { }
  listar(id_empleador: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, vacantes: Vacante[]}>(`${base_url}/vacante/lista/${id_empleador}?desde=${desde}&token=${token}`);
  }

  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/vacante?token=${token}`, formData);
  }

  // buscar por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/vacante/${id}?token=${token}`)
            .pipe(map((resp: any) => resp.vacante));
  }

  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/vacante/${id}?token=${token}`, formData);
  }

  // Inhabilitar ocupacion
  inhabilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/vacante/inhabilitar/${id}?token=${token}`, {});
  }

  // filtrado para el solicitante

  filtrar(formData: any, desde: number): any{
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/vacante/filtrar?desde=${desde}&token=${token}`, formData).
            pipe( map((resp: any) => resp.vacantes));
  }
}

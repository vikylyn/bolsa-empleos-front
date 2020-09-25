import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profesion } from '../../models/profesion/profesion.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {

  constructor(private http: HttpClient ) { }
  // listar todas
  listarProfesiones(): Observable<any>{
    return this.http.get<any>(`${base_url}/profesion/todas`)
    .pipe( map( (resp: any) => {
      return resp.profesiones;
    }));
  }
  // listando en base al area laboral y la actividad laboral
  filtrar(id_area: number, id_actividad: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, profesiones: Profesion[]}>(`${base_url}/profesion/${id_area}/${id_actividad}?desde=${desde}&token=${token}`);
  }
  // listar paginado
  listar(desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, profesiones: Profesion[]}>(`${base_url}/profesion?desde=${desde}&token=${token}`);
  }
  // busqueda por expresion regular - nombre
  busqueda(nombre: string): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/profesion/busqueda/lista/${nombre}?token=${token}`)
    .pipe(map((resp: any) => {
          return resp.profesiones;
        }));
  }
  eliminar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/profesion/deshabilitar/${id}?token=${token}`, {});
  }
  // busqueda por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/profesion/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.profesion));
  }

  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/profesion/${id}?token=${token}`, formData);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/profesion?token=${token}`, formData);
  }
}

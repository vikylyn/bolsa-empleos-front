import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Ocupacion } from '../../models/ocupacion/ocupacion.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OcupacionService {

  constructor(private http: HttpClient ) { }
  // listar todas
  listarProfesiones(): Observable<any>{
    return this.http.get<any>(`${base_url}/ocupacion/todas`)
    .pipe( map( (resp: any) => {
      return resp.ocupaciones;
    }));
  }
  listarNoAsignadasSolicitante(id_solicitante: number): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${base_url}/ocupacion/no-asiganadas/${id_solicitante}?token=${token}`)
    .pipe( map( (resp: any) => {
      return resp.ocupaciones;
    }));
  }
  // listando en base al area laboral y la actividad laboral
  filtrar(id_grupo: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, ocupaciones: Ocupacion[]}>(`${base_url}/ocupacion/${id_grupo}?desde=${desde}&token=${token}`);
  }
  // listar paginado
  listar(desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, ocupaciones: Ocupacion[]}>(`${base_url}/ocupacion?desde=${desde}&token=${token}`);
  }
  // busqueda por expresion regular - nombre
  busqueda(nombre: string): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/ocupacion/busqueda/lista/${nombre}?token=${token}`)
    .pipe(map((resp: any) => {
          return resp.ocupaciones;
        }));
  }
  inhabilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/ocupacion/inhabilitar/${id}?token=${token}`, {});
  }
  habilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/ocupacion/habilitar/${id}?token=${token}`, {});
  }
  // busqueda por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/ocupacion/buscar/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.ocupacion));
  }

  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/ocupacion/${id}?token=${token}`, formData);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/ocupacion?token=${token}`, formData);
  }
}

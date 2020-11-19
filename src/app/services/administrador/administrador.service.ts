import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Administrador } from '../../models/administrador/administrador.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }
  listar(desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, administradores: Administrador[]}>(`${base_url}/administrador?desde=${desde}&token=${token}`);
   //   .pipe(map((resp: any) => console.log(resp)));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/administrador/${id}?token=${token}`, formData);
  }
  // buscar por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/administrador/${id}?token=${token}`)
            .pipe(map((resp: any) => resp.administrador));
  }

  // busqueda por expresion regular - nombre
  busqueda(nombre: string): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/administrador/busqueda/${nombre}?token=${token}`)
    .pipe(map((resp: any) => {
          return resp.administradores;
        }));
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/administrador?token=${token}`, formData);
  }
  inhabilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/administrador/inhabilitar/${id}?token=${token}`);
  }
  habilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/administrador/habilitar/${id}?token=${token}`);
  }
}

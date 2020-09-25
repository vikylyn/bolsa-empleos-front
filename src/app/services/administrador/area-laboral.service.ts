import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AreaLaboral } from '../../models/profesion/area-laboral.model';
import { map } from 'rxjs/operators';




const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AreaLaboralService {

  constructor(private http: HttpClient) { }
  listarTodas(): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/area/todas?token=${token}`)
    .pipe( map((resp: any) => {
      return resp.areas;
    }));
  }
  listar(desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, areas: AreaLaboral[]}>(`${base_url}/area?desde=${desde}&token=${token}`);
  }
  // busqueda por expresion regular - nombre
  busqueda(nombre: string): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/area/busqueda/${nombre}?token=${token}`)
    .pipe(map((resp: any) => {
          return resp.areas;
        }));
  }
  eliminar(id: number): any {
    console.log(id);
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/area/deshabilitar/${id}?token=${token}`);
  }
  // busqueda por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/area/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.area));
  }

  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/area/${id}?token=${token}`, formData);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/area?token=${token}`, formData);
  }
}

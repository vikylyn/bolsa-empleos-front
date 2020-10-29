import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GrupoOcupacional } from '../../models/ocupacion/grupo-ocupacional.model';
import { map } from 'rxjs/operators';




const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class GrupoOcupacionalService {

  constructor(private http: HttpClient) { }
  listarTodas(): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/grupo-ocupacional/todos?token=${token}`)
    .pipe( map((resp: any) => {
      return resp.grupos;
    }));
  }
  listar(desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, grupos: GrupoOcupacional[]}>(`${base_url}/grupo-ocupacional?desde=${desde}&token=${token}`);
  }
  // busqueda por expresion regular - nombre
  busqueda(nombre: string): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/grupo-ocupacional/busqueda/${nombre}?token=${token}`)
    .pipe(map((resp: any) => {
          return resp.grupos;
        }));
  }
  eliminar(id: number): any {
    console.log(id);
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/grupo-ocupacional/inhabilitar/${id}?token=${token}`);
  }
  // busqueda por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/grupo-ocupacional/${id}?token=${token}`)
    .pipe(map((resp: any) => resp.grupo));
  }

  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/grupo-ocupacional/${id}?token=${token}`, formData);
  }
  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/grupo-ocupacional?token=${token}`, formData);
  }
}

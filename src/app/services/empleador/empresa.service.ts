import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }
  // buscar por id de empleador
  buscarPorIdEmpleador(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/empresa/empleador/${id}?token=${token}`)
            .pipe(map((resp: any) => resp.empresa));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/empresa/${id}?token=${token}`, formData);
  }
}

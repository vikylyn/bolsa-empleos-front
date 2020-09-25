import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private http: HttpClient) { }
     // buscar por id
  buscarPorIdSolicitante(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/curriculum/solicitante/${id}?token=${token}`);
  }

  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/curriculum?token=${token}`, formData);
  }
  modificar(id: number, formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/curriculum/${id}?token=${token}`, formData);
  }
}

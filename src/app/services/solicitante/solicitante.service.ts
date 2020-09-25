import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {

  constructor(private http: HttpClient) { }

  adicionarSolicitante( formData: any): any {
    return this.http.post(`${base_url}/solicitante`, formData);
  }
   // buscar por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/solicitante/${id}?token=${token}`)
            .pipe(map((resp: any) => resp.solicitante));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/solicitante/modificar/${id}?token=${token}`, formData);
  }

}

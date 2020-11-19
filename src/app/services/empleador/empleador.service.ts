import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EmpleadorService {

  constructor(private http: HttpClient) { }

  adicionarEmpleador( formData: any): any {
    return this.http.post(`${base_url}/empleador`, formData);
  }
  adicionarEmpleadorEmpresa( formData: any): any {
    return this.http.post(`${base_url}/empleador/empresa`, formData);
  }

   // buscar por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/empleador/${id}?token=${token}`)
            .pipe(map((resp: any) => resp.empleador));
  }
  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/empleador/${id}?token=${token}`, formData);
  }


}

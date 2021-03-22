import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InformacionAppService {

  constructor(private http: HttpClient) {}

  modificar(formData: any, idInformacion: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/informacion/${idInformacion}?token=${token}`, formData);
  }
  buscar(idInformacion: number): any{
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/informacion/${idInformacion}?token=${token}`)
    .pipe(map( (resp: any) => resp.informacion))
  }
}

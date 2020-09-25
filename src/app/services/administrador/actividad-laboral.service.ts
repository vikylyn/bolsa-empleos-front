import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AreaLaboral } from '../../models/profesion/area-laboral.model';
import { map } from 'rxjs/operators';




const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ActividadLaboralService {

  constructor(private http: HttpClient) { }
  listar(): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/actividad-laboral?token=${token}`)
    .pipe( map((resp: any) => {
      return resp.actividades;
    }));
  }
}

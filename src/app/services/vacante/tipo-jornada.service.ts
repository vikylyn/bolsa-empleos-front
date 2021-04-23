import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TipoJornadaService {

  constructor(private http: HttpClient) { }
  listar(): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/tipo-jornada/?token=${token}`)
           .pipe( map((resp: any) => resp.tipo_jornadas));
  }
}

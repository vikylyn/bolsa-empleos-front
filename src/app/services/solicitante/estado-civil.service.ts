import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(private http: HttpClient) { }

  listar(): any {
    return this.http.get(`${base_url}/estado-civil`)
           .pipe( map( (resp: any) => resp.estados_civiles));
  }
}

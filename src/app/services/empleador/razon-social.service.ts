import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RazonSocial } from '../../models/empleador/razon-social.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class RazonSocialService {

  constructor(private http: HttpClient) { }
  // buscar por id de empleador
  listar(): any {
    return this.http.get<{razones_sociales: RazonSocial[]}>(`${base_url}/razon-social`);
  }
}

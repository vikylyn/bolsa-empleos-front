import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  constructor(private http: HttpClient) { }

  modificar(formData: any, idCredencial: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/credenciales/${idCredencial}?token=${token}`, formData);
  }

  restablecerPasswordEnviarEmail(formData: any): any{
    return this.http.post(`${base_url}/credenciales/email`, formData);
  }
  restablecerPassword(formData: any, idCredencial: number, token: string): any{
    return this.http.put(`${base_url}/credenciales/password/${idCredencial}?token=${token}`, formData);
  }
}

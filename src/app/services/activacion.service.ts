import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ActivacionService {

  constructor(private http: HttpClient) { }

  activar( id: number, usuario: string, token: string): any {
    return this.http.put(`${base_url}/${usuario}/activacion/${id}?token=${token}`, {});
  }
}

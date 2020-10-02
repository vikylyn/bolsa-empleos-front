import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from '../../models/empleador/vacante.model';
import { environment } from '../../../environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  constructor(private http: HttpClient) { }
  listar(id_empleador: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, vacantes: Vacante[]}>(`${base_url}/vacante/lista/${id_empleador}?desde=${desde}&token=${token}`);
  }
}

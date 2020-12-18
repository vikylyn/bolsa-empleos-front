import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Solicitante } from '../../models/solicitante/solicitante.model';
import { Ocupacion } from '../../models/ocupacion/ocupacion.model';
import { Empleador } from '../../models/empleador/empleador.model';
import { Vacante } from '../../models/empleador/vacante.model';
import { Contratacion } from '../../models/empleador/contratacion.model';
import { Empresa } from '../../models/empleador/empresa.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  generarListadoSolicitantes(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post<{solicitantes: Solicitante[], ocupacion: Ocupacion, total: number}>(`${base_url}/reportes/solicitante?token=${token}`, formData);
  }

  generarListadoEmpleadores(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post<{empleadores: Empleador[], total: number}>(`${base_url}/reportes/empleador?token=${token}`, formData);
  }

  generarListadoEmpresas(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post<{empresas: Empresa[], total: number}>(`${base_url}/reportes/empresa?token=${token}`, formData);
  }

  generarListadoVacantes(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post<{vacantes: Vacante[], total: number}>(`${base_url}/reportes/vacante?token=${token}`, formData);
  }
  generarListadoContrataciones(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post<{contrataciones: Contratacion[], total: number}>(`${base_url}/reportes/contratacion?token=${token}`, formData);
  }
}

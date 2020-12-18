import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from '../../models/empleador/vacante.model';
import { environment } from '../../../environments/environment';
import { map, delay } from 'rxjs/operators';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  constructor(private http: HttpClient) { }
  listarTodas(id_empleador: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, vacantes: Vacante[]}>(`${base_url}/vacante/lista/${id_empleador}?desde=${desde}&token=${token}`);
  }
  listarHabilitadas(id_empleador: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, vacantes: Vacante[]}>(`${base_url}/vacante/lista-habilitadas/${id_empleador}?desde=${desde}&token=${token}`);
  }
  listarHabilitadasSinPaginacion(id_empleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{vacantes: Vacante[]}>(`${base_url}/vacante/lista-completa-habilitadas/${id_empleador}?token=${token}`)
          .pipe( delay(300));
  }
  listarInhabilitadas(id_empleador: number, desde: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{total: number, vacantes: Vacante[]}>(`${base_url}/vacante/lista-inhabilitadas/${id_empleador}?desde=${desde}&token=${token}`);
  }

  adicionar(formData: any): any {
    const token = localStorage.getItem('token');
    return this.http.post(`${base_url}/vacante?token=${token}`, formData);
  }

  // buscar por id
  buscar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/vacante/${id}?token=${token}`)
            .pipe(map((resp: any) => resp.vacante));
  }

  modificar(formData: any, id: number): any{
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/vacante/${id}?token=${token}`, formData);
  }
  // Eliminacion logica, atributo de la vacante pasa a eliminado = true;
  eliminacionLogica(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/vacante/eliminacion-logica/${id}?token=${token}`, {});
  }
  // Eliminacion fisica, registro borrado de la tabla;
  eliminacionFisica(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.delete(`${base_url}/vacante/eliminacion-fisica/${id}?token=${token}`);
  }
  // Inhabilitar vacante
  inhabilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/vacante/inhabilitar/${id}?token=${token}`, {});
  }

  // habilitar vacante
  habilitar(id: number): any {
    const token = localStorage.getItem('token');
    return this.http.put(`${base_url}/vacante/habilitar/${id}?token=${token}`, {});
  }

  // filtrado para el solicitante

  filtrar(formData: any, desde: number): any{
    const token = localStorage.getItem('token');
    return this.http.post<{vacantes: Vacante[], total: number}>
    (`${base_url}/vacante/filtrar?desde=${desde}&token=${token}`, formData);
  }
  busqueda(valor: string, idEmpleador: number): any {
    const token = localStorage.getItem('token');
    return this.http.get<{vacantes: Vacante[]}>(`${base_url}/vacante/busqueda/${idEmpleador}/${valor}?token=${token}`);
  }
}

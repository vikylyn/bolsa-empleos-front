import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http: HttpClient ) { }

  listarPaises(): any {
    return this.http.get(`${base_url}/ubicacion/pais`)
           .pipe( map( (resp: any) => resp.paises));
  }
  listarEstados(): any {
    return this.http.get(`${base_url}/ubicacion/estado`);
  }
  listarCiudades(id_pais: number): any {
    return this.http.get(`${base_url}/ubicacion/ciudad/${id_pais}`)
           .pipe( map( (resp: any) => resp.ciudades));
  }

}

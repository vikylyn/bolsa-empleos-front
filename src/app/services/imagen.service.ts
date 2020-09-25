import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }
  // Posiblemente sea innecesario el buscar
  buscar(): any {
    const imagen = JSON.parse(localStorage.getItem('imagen'));
    const token = localStorage.getItem('token');
    return this.http.get(`${base_url}/upload/` + imagen.id + '?token=' + token).pipe(
      map((resp: any) => resp.imagen)
    );
  }
  cambiarImagen(archivo: File, tipo: string, id: number): any {
    const formData = new FormData();
    formData.append('image', archivo, archivo.name);
    return this.http.put(`${base_url}/upload/${tipo}/${id}`, formData)
           .pipe( map( (resp: any) => resp.imagen));
  }
}

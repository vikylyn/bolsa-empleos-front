import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: number) {
    return new Promise( (resolve, reject) => {
          // Lo que mandaremos a la peticion por ajax payload
    let formData = new FormData();
    // inicializar peticion ajax
    let xhr = new XMLHttpRequest();

    formData.append('image', archivo, archivo.name);

    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            console.log( 'Imagen subida');
            resolve(JSON.parse(xhr.response));
           } else {
             console.log('fallo la subida');
             reject(JSON.parse(xhr.response));
           }
        }
      };
    let url = base_url + '/upload/' + tipo + '/' + id;
    xhr.open('PUT' , url, true);
    xhr.send( formData );
    });

  }
}

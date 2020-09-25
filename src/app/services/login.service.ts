import { Injectable, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rol } from 'src/app/models/rol.model';
import { tap } from 'rxjs/internal/operators/tap';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Imagen } from '../models/imagen.model';
import { Empleador } from '../models/empleador/empleador.model';
import { Solicitante } from '../models/solicitante/solicitante.model';
import { Administrador } from '../models/administrador/administrador.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // rol: Rol;
 // id: number;
  token: string;
 // imagen: Imagen;
  empleador: Empleador;
  solicitante: Solicitante;
  administrador: Administrador;
  constructor(private http: HttpClient,
              private router: Router) {
                this.cargarStorage();
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const id = localStorage.getItem('id');
    return this.http.post(`${base_url}/login/renovar` + `?token=${token}`, id)
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token);
            }),
            map( resp => true),
            catchError( error => of(false))
          );
  }
  // carga el storage para que compartir los atributos con la clase que los inyecta
  cargarStorage(): any {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      if (localStorage.getItem('empleador')) {
        this.empleador = JSON.parse(localStorage.getItem('empleador'));
      }
      if (localStorage.getItem('solicitante')) {
        this.solicitante = JSON.parse(localStorage.getItem('solicitante'));
      }
      if (localStorage.getItem('administrador')) {
        this.administrador = JSON.parse(localStorage.getItem('administrador'));
      }
    } else {
      this.token = '';
      this.solicitante = null;
      this.empleador = null;
      this.administrador = null;
    }
  }
  guardarStorage(usuario: any, token: string): void {
    localStorage.setItem('token', token);
    if (usuario.credenciales.rol.nombre === 'ROLE_EMPLEADOR') {
      localStorage.setItem('empleador', JSON.stringify(usuario));
    }
    if (usuario.credenciales.rol.nombre === 'ROLE_SOLICITANTE') {
      localStorage.setItem('solicitante', JSON.stringify(usuario));
    }
    if (usuario.credenciales.rol.nombre === 'ROLE_ADMINISTRADOR') {
      localStorage.setItem('administrador', JSON.stringify(usuario));
    }
  }
  guardarImagenStorage(imagen: Imagen): void{
    localStorage.setItem('imagen', JSON.stringify(imagen));
    if (this.solicitante != null) {
      this.solicitante.imagen = imagen;
      localStorage.setItem('solicitante', JSON.stringify(this.solicitante));
    }
    if (this.administrador != null) {
      this.administrador.imagen = imagen;
      localStorage.setItem('administrador', JSON.stringify(this.administrador));
    }
    if (this.empleador != null) {
      this.empleador.imagen = imagen;
      localStorage.setItem('empleador', JSON.stringify(this.empleador));

    }
    this.cargarStorage();
  }
  login( formData: any): any {
    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem('token', resp.token);
            this.guardarStorage(resp.usuario , resp.token);
            this.cargarStorage();
            if ( formData.recuerdame === true ) {
              localStorage.setItem('email', resp.usuario.credenciales.email);
            } else {
              localStorage.removeItem('email');
            }
          })
        );
  }
  logout(): any {
    this.solicitante = null;
    this.administrador = null;
    this.empleador = null;
    localStorage.removeItem('token');
    localStorage.removeItem('empleador');
    localStorage.removeItem('solicitante');
    localStorage.removeItem('administrador');
    this.router.navigateByUrl('/login');
  }
}

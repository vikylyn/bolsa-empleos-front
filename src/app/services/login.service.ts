import { Injectable, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Imagen } from '../models/imagen.model';
import { Empleador } from '../models/empleador/empleador.model';
import { Solicitante } from '../models/solicitante/solicitante.model';
import { Administrador } from '../models/administrador/administrador.model';
import { Empresa } from '../models/empleador/empresa.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string;
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
      this.cargarStorage();
    }else
    if (usuario.credenciales.rol.nombre === 'ROLE_SOLICITANTE') {
      localStorage.setItem('solicitante', JSON.stringify(usuario));
      this.cargarStorage();
    }
    if (usuario.credenciales.rol.nombre === 'ROLE_ADMINISTRADOR') {
      localStorage.setItem('administrador', JSON.stringify(usuario));
      this.cargarStorage();
    }
  }
  guardarImagenStorage(imagen: Imagen, rol: string): void{
    if (rol === 'ROLE_SOLICITANTE') {
      this.solicitante.imagen = imagen;
      localStorage.setItem('solicitante', JSON.stringify(this.solicitante));
    }else
    if (rol === 'ROLE_ADMINISTRADOR') {
      this.administrador.imagen = imagen;
      localStorage.setItem('administrador', JSON.stringify(this.administrador));
    }else if ( rol === 'ROLE_EMPLEADOR') {
      this.empleador.imagen = imagen;
      localStorage.setItem('empleador', JSON.stringify(this.empleador));
    }else  if ( rol === 'ROLE_EMPRESA') {
      this.empleador.empresa.logo = imagen;
      localStorage.setItem('empleador', JSON.stringify(this.empleador));
    }
    this.cargarStorage();
  }

  login( formData: any): any {
    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap( (resp: any) => {
            console.log('respuesta autenticacion', resp);
            localStorage.setItem('token', resp.token);
            this.guardarStorage(resp.usuario, resp.token);
         //   this.cargarStorage();
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
    localStorage.removeItem('empresa');
    this.router.navigateByUrl('/login');
  }
}

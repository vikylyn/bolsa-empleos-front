import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menuSolicitante: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Inicio', url: '/inicio-solicitante',
          submenu: []},
        {titulo: 'Curriculum', url: '',
          submenu: [
            {titulo: 'Administracion', url: '/curriculum/administracion'},
            {titulo: 'Habilidades', url: '/curriculum/habilidad'},
            {titulo: 'Experiencias Laborales', url: '/curriculum/experiencia-laboral'},
            {titulo: 'Estudios basicos', url: '/curriculum/estudio-basico'},
            {titulo: 'Estudios avanzados', url: '/curriculum/estudio-avanzado'},
            {titulo: 'Referencias', url: '/curriculum/referencia'},
            {titulo: 'Idiomas', url: '/curriculum/idioma'},

          ]},
        {titulo: 'Postulaciones', url: '/postulaciones-solicitante', submenu: []},
        {titulo: 'Contrataciones', url: '/contrataciones-solicitante', submenu: []},
      ]
    }
  ];
  menuEmpleador: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Inicio', url: '/inicio-empleador', submenu: []},
        {titulo: 'Vacantes', url: '/vacante', submenu: []},
        {titulo: 'Postulaciones', url: '/postulaciones-empleador', submenu: []},
        {titulo: 'Contrataciones', url: '/contrataciones-empleador', submenu: []},
      ]
    }
  ];
  menuAdministrador: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Inicio', url: '/dashboard'},
        {titulo: 'Administradores', url: '/administrador'},
        {titulo: 'Grupos Ocupacionales', url: '/area-laboral'},
        {titulo: 'Ocupaciones', url: '/profesion'},
        {titulo: 'Reportes', url: '/reporte'},
      ]
    }
  ];
  constructor() {
  }
}

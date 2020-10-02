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
        {titulo: 'Curriculum', url: '/curriculum',
          submenu: [
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
        {titulo: 'Inicio', url: '/dashboard', submenu: []},
        {titulo: 'Vacantes', url: '/vacante', submenu: []},
        {titulo: 'Postulaciones', url: '/postulacion', submenu: []},
        {titulo: 'Contrataciones', url: '/contratacion', submenu: []},
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
        {titulo: 'Areas laborales', url: '/area-laboral'},
        {titulo: 'Profesiones', url: '/profesion'},
        {titulo: 'Reportes', url: '/reporte'},
      ]
    }
  ];
  constructor() {
  }
}

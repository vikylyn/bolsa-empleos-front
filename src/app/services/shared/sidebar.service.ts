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
        {titulo: 'Notificaciones', url: '/notificaciones-solicitante',
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
        {titulo: 'Postulaciones', url: '', submenu: [
          {titulo: 'Pendientes', url: '/postulaciones-pendientes-solicitante'},
          {titulo: 'Aceptadas', url: '/postulaciones-solicitante'},
          {titulo: 'Rechazadas', url: '/postulaciones-rechazadas-solicitante'},
        ]},
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
        {titulo: 'Notificaciones', url: '/notificaciones-empleador', submenu: []},
        {titulo: 'Vacantes', url: '/vacante', submenu: []},
        {titulo: 'Postulantes', url: '', submenu: [
          {titulo: 'Pendientes', url: '/postulantes-pendientes'},
          {titulo: 'Favoritos', url: '/postulantes/favoritos'},
          {titulo: 'Considerados', url: '/postulaciones-empleador'},
          {titulo: 'Rechazados', url: '/postulantes-rechazados-empleador'},

        ]},
        {titulo: 'Contrataciones', url: '/contrataciones-empleador', submenu: []},
      ]
    }
  ];
  menuAdministrador: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Inicio', url: '/dashboard', submenu: []},
        {titulo: 'Administrar Informacion de la Aplicacion', url: '/informacion-app', submenu: []},
        {titulo: 'Administradores', url: '/administrador', submenu: []},
        {titulo: 'Grupos Ocupacionales', url: '/area-laboral', submenu: []},
        {titulo: 'Ocupaciones', url: '/profesion', submenu: []},
        {titulo: 'Reportes', url: '', submenu: [
          {titulo: 'Reporte de solicitantes registrados', url: '/reporte-solicitante'},
          {titulo: 'Reporte de solicitantes rechazados', url: '/reporte-solicitantes-rechazados'},
          {titulo: 'Reporte de solicitantes contratados', url: '/reporte-solicitantes-contratados'},
          {titulo: 'Reporte de empleadores', url: '/reporte-empleador'},
          {titulo: 'Reporte de empresas', url: '/reporte-empresa'},
          {titulo: 'Reporte de vacantes', url: '/reporte-vacante'},
          {titulo: 'Reporte de contrataciones', url: '/reporte-contratacion'},
        ]},
      ]
    }
  ];
  constructor() {
  }
}

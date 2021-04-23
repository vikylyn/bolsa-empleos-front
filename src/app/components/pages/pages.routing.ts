import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../guards/auth.guard';
import { PerfilAdministradorComponent } from './perfil/perfil-administrador/perfil-administrador.component';
import { GrupoOcupacionalComponent } from './grupos-ocupacionales/grupos-ocupacionales.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { OcupacionComponent } from './ocupacion/ocupacion.component';
import { PerfilSolicitanteComponent } from './perfil/perfil-solicitante/perfil-solicitante.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { AdministrarCurriculumComponent } from './curriculum/administrar-curriculum/administrar-curriculum.component';
import { HabilidadComponent } from './curriculum/habilidad/habilidad.component';
import { ExperienciaLaboralComponent } from './curriculum/experiencia-laboral/experiencia-laboral.component';
import { ReferenciaComponent } from './curriculum/referencia/referencia.component';
import { IdiomaComponent } from './curriculum/idioma/idioma.component';
import { EstudioBasicoComponent } from './curriculum/estudio-basico/estudio-basico.component';
import { EstudioAvanzadoComponent } from './curriculum/estudio-avanzado/estudio-avanzado.component';
import { PerfilEmpleadorComponent } from './perfil/perfil-empleador/perfil-empleador.component';
import { PerfilEmpresaComponent } from './perfil/perfil-empresa/perfil-empresa.component';
import { EmpresaGuard } from '../../guards/empresa.guard';
import { PostulacionSolicitanteComponent } from './postulaciones/postulacion-solicitante/postulacion-aceptadas-solicitante.component';
import { ContratacionSolicitanteComponent } from './contrataciones/contratacion-solicitante/contratacion-solicitante.component';
import { InicioSolicitanteComponent } from './inicio/inicio-solicitante/inicio-solicitante.component';
import { VacantesComponent } from './vacante/vacantes-empleador/vacantes.component';
import { OcupacionSolicitanteComponent } from './perfil/ocupacion-solicitante/ocupacion-solicitante.component';
import { PostulacionEmpleadorComponent } from './postulaciones/postulacion-empleador/postulacion-consideradas-empleador.component';
import { ContratacionEmpleadorComponent } from './contrataciones/contratacion-empleador/contratacion-empleador.component';
import { InicioEmpleadorComponent } from './inicio/inicio-empleador/inicio-empleador.component';
import { FotoSolicitanteComponent } from './perfil/foto/foto-solicitante/foto-solicitante.component';
import { FotoEmpleadorComponent } from './perfil/foto/foto-empleador/foto-empleador.component';
import { FotoEmpresaComponent } from './perfil/foto/foto-empresa/foto-empresa.component';
import { FotoAdministradorComponent } from './perfil/foto/foto-administrador/foto-administrador.component';
import { ReporteSolicitantesComponent } from './reportes/reporte-solicitantes-registrados/reporte-solicitantes-registrados.component';
import { ReporteEmpleadoresComponent } from './reportes/reporte-empleadores/reporte-empleadores.component';
import { ReporteVacantesComponent } from './reportes/reporte-vacantes/reporte-vacantes.component';
import { ReporteContratacionesComponent } from './reportes/reporte-contrataciones/reporte-contrataciones.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { PostulacionesEmpleadorFavoritosComponent } from './postulaciones/postulaciones-empleador-favoritos/postulaciones-empleador-favoritos.component';
import { ReporteEmpresasComponent } from './reportes/reporte-empresas/reporte-empresas.component';
import { VerNotificacionEmpleadorComponent } from './notificaciones/ver-notificacion-empleador/ver-notificacion-empleador.component';
import { VerNotificacionPostulacionSolicitanteComponent } from './notificaciones/ver-notificacion-postulacion-solicitante/ver-notificacion-postulacion-solicitante.component';
import { PostulacionesRechazadasSolicitanteComponent } from './postulaciones/postulaciones-rechazadas-solicitante/postulaciones-rechazadas-solicitante.component';
import { PostulacionesRechazadasEmpleadorComponent } from './postulaciones/postulaciones-rechazadas-empleador/postulaciones-rechazadas-empleador.component';
import { PostulacionesSinConsiderarEmpleadorComponent } from './postulaciones/postulaciones-sin-considerar-empleador/postulaciones-sin-considerar-empleador.component';
import { PostulacionesPendientesSolicitanteComponent } from './postulaciones/postulaciones-pendientes-solicitante/postulaciones-pendientes-solicitante.component';
import { ReporteSolicitantesRechazadosComponent } from './reportes/reporte-solicitantes-rechazados/reporte-solicitantes-rechazados.component';
import { ReporteSolicitantesContratadosComponent } from './reportes/reporte-solicitantes-contratados/reporte-solicitantes-contratados.component';
import { InformacionAppComponent } from './informacion-app/informacion-app.component';
import { ListaNotificacionesSolicitanteComponent } from './notificaciones/lista-notificaciones-solicitante/lista-notificaciones-solicitante.component';
import { ListaNotificacionesEmpleadorComponent } from './notificaciones/lista-notificaciones-empleador/lista-notificaciones-empleador.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: '**', redirectTo: '/dashboard' }
        ],
    },
    {
        path: 'perfil-administrador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PerfilAdministradorComponent, data: { titulo: 'Perfil de Administrador'}}        ],
    },
    {
        path: 'credenciales/:rol',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: CambiarPasswordComponent, data: { titulo: 'Cambiar Contraseña'}}        ],
    },
    {
        path: 'administrador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: AdministradorComponent, data: { titulo: 'Administradores'}},
        ],
    },
    {
        path: 'area-laboral',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: GrupoOcupacionalComponent, data: { titulo: 'Grupos ocupacionales'}},
        ],
    },
    {
        path: 'profesion',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: OcupacionComponent, data: { titulo: 'Ocupaciones'}},
        ],
    },
    {
        path: 'reporte-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteSolicitantesComponent, data: { titulo: 'Reporte de solicitantes registrados'}},
        ],
    },
    {
        path: 'reporte-solicitantes-rechazados',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteSolicitantesRechazadosComponent, data: { titulo: 'Reporte de solicitantes rechazados'}},
        ],
    },
    {
        path: 'reporte-solicitantes-contratados',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteSolicitantesContratadosComponent, data: { titulo: 'Reporte de solicitantes contratados'}},
        ],
    },
    {
        path: 'reporte-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteEmpleadoresComponent, data: { titulo: 'Reporte de empleadores'}},
        ],
    },
    {
        path: 'reporte-empresa',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteEmpresasComponent, data: { titulo: 'Reporte de empresas'}},
        ],
    },
    {
        path: 'reporte-vacante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteVacantesComponent, data: { titulo: 'Reporte de vacantes'}},
        ],
    },
    {
        path: 'reporte-contratacion',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteContratacionesComponent, data: { titulo: 'Reporte de contrataciones'}},
        ],
    },
    {
        path: 'informacion-app',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: InformacionAppComponent, data: { titulo: 'Informacion de la App'}},
        ],
    },
    {
        path: 'perfil-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PerfilSolicitanteComponent, data: { titulo: 'Perfil de Solicitante'}},
        ],
    },
    {
        path: 'foto-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: FotoSolicitanteComponent, data: { titulo: 'Foto de Perfil'}},
        ],
    },
    {
        path: 'foto-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: FotoEmpleadorComponent, data: { titulo: 'Foto de Perfil'}},
        ],
    },
    {
        path: 'foto-empresa',
        component: PagesComponent,
        canActivate: [AuthGuard, EmpresaGuard],
        children: [
            { path: '', component: FotoEmpresaComponent, data: { titulo: 'Logo'}},
        ],
    },
    {
        path: 'foto-administrador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: FotoAdministradorComponent, data: { titulo: 'Foto de Perfil'}},
        ],
    },
    {
        path: 'ocupaciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: OcupacionSolicitanteComponent, data: { titulo: 'Mis ocupaciones'}},
        ],
    },
    {
        path: 'inicio-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: InicioSolicitanteComponent},
            { path: '**', redirectTo: '/inicio-solicitante' }
        ],
    },
    {
        path: 'curriculum',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: CurriculumComponent, data: { titulo: 'Curriculum'} },
            { path: 'administracion', component: AdministrarCurriculumComponent, data: { titulo: 'Administracion de Curriculum'} },
            { path: 'experiencia-laboral', component: ExperienciaLaboralComponent, data: { titulo: 'Experiencias Laborales'} },
            { path: 'habilidad', component: HabilidadComponent, data: { titulo: 'Habilidades'} },
            { path: 'estudio-basico', component: EstudioBasicoComponent, data: { titulo: 'Estudios basicos'} },
            { path: 'estudio-avanzado', component: EstudioAvanzadoComponent, data: { titulo: 'Estudios Avanzados'} },
            { path: 'referencia', component: ReferenciaComponent, data: { titulo: 'Referencias'} },
            { path: 'idioma', component: IdiomaComponent, data: { titulo: 'Idiomas'} },
            { path: '**', redirectTo: '/curriculum' }

        ],
    },
    {
        path: 'postulaciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionSolicitanteComponent, data: { titulo: 'Postulaciones Aceptadas'}},
            { path: 'notificacion/:id', component: VerNotificacionPostulacionSolicitanteComponent, data: { titulo: 'Postulaciones'}},
        ],
    },
    {
        path: 'postulaciones-rechazadas-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesRechazadasSolicitanteComponent, data: { titulo: 'Postulaciones Rechazadas'}},
        ],
    },
    {
        path: 'postulaciones-pendientes-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesPendientesSolicitanteComponent, data: { titulo: 'Pendientes'}},
        ],
    },
    {
        path: 'contrataciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ContratacionSolicitanteComponent, data: { titulo: 'Contrataciones'}},
            { path: 'notificacion/:id', component: VerNotificacionPostulacionSolicitanteComponent, data: { titulo: 'Contrataciones'}},
        ],
    },
    {
        path: 'perfil-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PerfilEmpleadorComponent, data: { titulo: 'Datos Personales'}},
        ],
    },
    {
        path: 'perfil-empresa',
        component: PagesComponent,
        canActivate: [AuthGuard, EmpresaGuard],
        children: [
            { path: '', component: PerfilEmpresaComponent, data: { titulo: 'Datos de la Empresa'}},
        ],
    },
    {
        path: 'inicio-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: InicioEmpleadorComponent},
            { path: '**', redirectTo: '/inicio-empleador' }
        ],
    },
    {
        path: 'vacante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: VacantesComponent, data: { titulo: 'Vacantes'}},
        ],
    },
    {
        path: 'postulaciones-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionEmpleadorComponent, data: { titulo: 'Considerados'}},
            { path: 'favoritos', component: PostulacionesEmpleadorFavoritosComponent, data: { titulo: 'Postulantes Favoritos'}},
        ],
    },
    {
        path: 'postulantes-rechazados-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesRechazadasEmpleadorComponent, data: { titulo: 'Rechazados'}},
        ],
    },
    {
        path: 'postulantes-pendientes',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesSinConsiderarEmpleadorComponent, data: { titulo: 'Pendientes'}},
        ],
    },
    {
        path: 'postulantes/favoritos',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesEmpleadorFavoritosComponent, data: { titulo: 'Favoritos'}},
        ],
    },
    {
        path: 'contrataciones-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ContratacionEmpleadorComponent, data: { titulo: 'Contrataciones'}},
        ],
    },
    {
        path: 'notificaciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ListaNotificacionesSolicitanteComponent, data: { titulo: 'Notificaciones'}},
        ],
    },
    {
        path: 'notificaciones-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ListaNotificacionesEmpleadorComponent, data: { titulo: 'Notificaciones'}},
            { path: ':id', component: VerNotificacionEmpleadorComponent, data: { titulo: 'Notificacion'}},
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}



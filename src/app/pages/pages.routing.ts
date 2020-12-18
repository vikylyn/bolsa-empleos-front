import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilAdministradorComponent } from './perfil/perfil-administrador/perfil-administrador.component';
import { AreasLaboralesComponent } from './areas-laborales/areas-laborales.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ProfesionComponent } from './profesion/profesion.component';
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
import { EmpresaGuard } from '../guards/empresa.guard';
import { PostulacionSolicitanteComponent } from './postulaciones/postulacion-solicitante/postulacion-solicitante.component';
import { ContratacionSolicitanteComponent } from './contrataciones/contratacion-solicitante/contratacion-solicitante.component';
import { InicioSolicitanteComponent } from './inicio/inicio-solicitante/inicio-solicitante.component';
import { VacantesComponent } from './vacante/vacantes-empleador/vacantes.component';
import { OcupacionSolicitanteComponent } from './perfil/ocupacion-solicitante/ocupacion-solicitante.component';
import { PostulacionEmpleadorComponent } from './postulaciones/postulacion-empleador/postulacion-empleador.component';
import { PerfilComponent } from './curriculum/perfil/perfil.component';
import { ContratacionEmpleadorComponent } from './contrataciones/contratacion-empleador/contratacion-empleador.component';
import { InicioEmpleadorComponent } from './inicio/inicio-empleador/inicio-empleador.component';
import { FotoSolicitanteComponent } from './perfil/foto/foto-solicitante/foto-solicitante.component';
import { FotoEmpleadorComponent } from './perfil/foto/foto-empleador/foto-empleador.component';
import { FotoEmpresaComponent } from './perfil/foto/foto-empresa/foto-empresa.component';
import { FotoAdministradorComponent } from './perfil/foto/foto-administrador/foto-administrador.component';
import { ReporteSolicitantesComponent } from './reportes/reporte-solicitantes/reporte-solicitantes.component';
import { ReporteEmpleadoresComponent } from './reportes/reporte-empleadores/reporte-empleadores.component';
import { ReporteVacantesComponent } from './reportes/reporte-vacantes/reporte-vacantes.component';
import { ReporteContratacionesComponent } from './reportes/reporte-contrataciones/reporte-contrataciones.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { PostulacionesEmpleadorFavoritosComponent } from './postulaciones/postulaciones-empleador-favoritos/postulaciones-empleador-favoritos.component';
import { ReporteEmpresasComponent } from './reportes/reporte-empresas/reporte-empresas.component';
import { VerNotificacionEmpleadorComponent } from './notificaciones/ver-notificacion-postulacion-empleador/ver-notificacion-empleador.component';
import { VerNotificacionContratacionEmpleadorComponent } from './notificaciones/ver-notificacion-contratacion-empleador/ver-notificacion-contratacion-empleador.component';
import { VerNotificacionPostulacionSolicitanteComponent } from './notificaciones/ver-notificacion-postulacion-solicitante/ver-notificacion-postulacion-solicitante.component';
import { PostulacionesRechazadasSolicitanteComponent } from './postulaciones/postulaciones-rechazadas-solicitante/postulaciones-rechazadas-solicitante.component';
import { PostulacionesRechazadasEmpleadorComponent } from './postulaciones/postulaciones-rechazadas-empleador/postulaciones-rechazadas-empleador.component';
import { PostulacionesSinConsiderarEmpleadorComponent } from './postulaciones/postulaciones-sin-considerar-empleador/postulaciones-sin-considerar-empleador.component';
import { PostulacionesPendientesSolicitanteComponent } from './postulaciones/postulaciones-pendientes-solicitante/postulaciones-sin-considerar-solicitante.component';

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
            { path: '', component: AreasLaboralesComponent, data: { titulo: 'Grupos ocupacionales'}},
        ],
    },
    {
        path: 'profesion',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ProfesionComponent, data: { titulo: 'Ocupaciones'}},
        ],
    },
    {
        path: 'reporte-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReporteSolicitantesComponent, data: { titulo: 'Reporte de solicitantes por ocupacion'}},
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
            { path: '', component: FotoEmpresaComponent, data: { titulo: 'Foto de Perfil'}},
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
            { path: 'experiencia-laboral', component: ExperienciaLaboralComponent, data: { titulo: 'Administracion de Experiencias Laborales'} },
            { path: 'habilidad', component: HabilidadComponent, data: { titulo: 'Administracion de Habilidades'} },
            { path: 'estudio-basico', component: EstudioBasicoComponent, data: { titulo: 'Administracion de Estudios basicos'} },
            { path: 'estudio-avanzado', component: EstudioAvanzadoComponent, data: { titulo: 'Administracion de Estudios Avanzados'} },
            { path: 'referencia', component: ReferenciaComponent, data: { titulo: 'Administracion de Referencias'} },
            { path: 'idioma', component: IdiomaComponent, data: { titulo: 'Administracion de Idiomas'} },
            { path: '**', redirectTo: '/curriculum' }

        ],
    },
    {
        path: 'postulaciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionSolicitanteComponent, data: { titulo: 'Postulaciones'}},
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
            { path: '', component: PostulacionesPendientesSolicitanteComponent, data: { titulo: 'Postulaciones Pendietes'}},
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
            { path: '', component: PerfilEmpleadorComponent, data: { titulo: 'Perfil de Empleador'}},
        ],
    },
    {
        path: 'perfil-empresa',
        component: PagesComponent,
        canActivate: [AuthGuard, EmpresaGuard],
        children: [
            { path: '', component: PerfilEmpresaComponent, data: { titulo: 'Perfil de Empresa'}},
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
            { path: '', component: PostulacionEmpleadorComponent, data: { titulo: 'Postulantes'}},
            { path: 'favoritos', component: PostulacionesEmpleadorFavoritosComponent, data: { titulo: 'Postulantes Favoritos'}},
            { path: 'notificacion/:id', component: VerNotificacionEmpleadorComponent, data: { titulo: 'Postulantes'}},
        ],
    },
    {
        path: 'postulantes-rechazados-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesRechazadasEmpleadorComponent, data: { titulo: 'Postulantes Rechazados'}},
        ],
    },
    {
        path: 'postulantes-pendientes',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesSinConsiderarEmpleadorComponent, data: { titulo: 'Postulantes Pendientes'}},
        ],
    },
    {
        path: 'postulantes/favoritos',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionesEmpleadorFavoritosComponent, data: { titulo: 'Postulantes Favoritos'}},
        ],
    },
    {
        path: 'perfil-curriculum',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: ':tipo/:id_solicitante/:id_postulacion_contratacion', component: PerfilComponent, data: { titulo: 'Perfil de solicitante'}}
        ],
    },
    {
        path: 'contrataciones-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ContratacionEmpleadorComponent, data: { titulo: 'Contrataciones'}},
            { path: 'notificacion/:id', component: VerNotificacionContratacionEmpleadorComponent, data: { titulo: 'Contrataciones'}},
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}



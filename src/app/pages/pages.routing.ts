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
        path: 'administrador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: AdministradorComponent, data: { titulo: 'Gestion de Administradores'}},
        ],
    },
    {
        path: 'area-laboral',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: AreasLaboralesComponent, data: { titulo: 'Administracion de Grupos ocupacionales'}},
        ],
    },
    {
        path: 'profesion',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ProfesionComponent, data: { titulo: 'Administracion de Ocupaciones'}},
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
        ],
    },
    {
        path: 'contrataciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ContratacionSolicitanteComponent, data: { titulo: 'Contrataciones'}},
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
            { path: '', component: PostulacionEmpleadorComponent, data: { titulo: 'Postulaciones'}},
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
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}



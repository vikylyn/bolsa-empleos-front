import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilAdministradorComponent } from './perfil/perfil-administrador/perfil-administrador.component';
import { AreasLaboralesComponent } from './areas-laborales/areas-laborales.component';
import { FormularioAreaComponent } from './areas-laborales/formulario-area/formulario-area.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { FormularioAdministradorComponent } from './administrador/formulario-administrador/formulario-administrador.component';
import { ProfesionComponent } from './profesion/profesion.component';
import { FormularioProfesionComponent } from './profesion/formulario-profesion/formulario-profesion.component';
import { PerfilSolicitanteComponent } from './perfil/perfil-solicitante/perfil-solicitante.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { AdministrarCurriculumComponent } from './curriculum/administrar-curriculum/administrar-curriculum.component';
import { FormularioExperienciaLaboralComponent } from './curriculum/experiencia-laboral/formulario-experiencia-laboral/formulario-experiencia-laboral.component';
import { FormularioHabilidadComponent } from './curriculum/habilidad/formulario-habilidad/formulario-habilidad.component';
import { FormularioReferenciaComponent } from './curriculum/referencia/formulario-referencia/formulario-referencia.component';
import { HabilidadComponent } from './curriculum/habilidad/habilidad.component';
import { ExperienciaLaboralComponent } from './curriculum/experiencia-laboral/experiencia-laboral.component';
import { ReferenciaComponent } from './curriculum/referencia/referencia.component';
import { IdiomaComponent } from './curriculum/idioma/idioma.component';
import { EstudioBasicoComponent } from './curriculum/estudio-basico/estudio-basico.component';
import { EstudioAvanzadoComponent } from './curriculum/estudio-avanzado/estudio-avanzado.component';
import { FormularioEstudioBasicoComponent } from './curriculum/estudio-basico/formulario-estudio-basico/formulario-estudio-basico.component';
import { FormularioEstudioAvanzadoComponent } from './curriculum/estudio-avanzado/formulario-estudio-avanzado/formulario-estudio-avanzado.component';
import { FormularioIdiomaComponent } from './curriculum/idioma/formulario-idioma/formulario-idioma.component';
import { PerfilEmpleadorComponent } from './perfil/perfil-empleador/perfil-empleador.component';
import { FormularioDatosPersonalesComponent } from './curriculum/administrar-curriculum/formulario-datos-personales/formulario-datos-personales.component';
import { FormularioEncabezadoComponent } from './curriculum/administrar-curriculum/formulario-encabezado/formulario-encabezado.component';
import { PerfilEmpresaComponent } from './perfil/perfil-empresa/perfil-empresa.component';
import { EmpresaGuard } from '../guards/empresa.guard';
import { PostulacionSolicitanteComponent } from './postulaciones/postulacion-solicitante/postulacion-solicitante.component';
import { ContratacionSolicitanteComponent } from './contrataciones/contratacion-solicitante/contratacion-solicitante.component';
import { InicioSolicitanteComponent } from './inicio/inicio-solicitante/inicio-solicitante.component';
import { VacantesComponent } from './vacante/vacantesEmpleador/vacantes.component';
import { OcupacionSolicitanteComponent } from './perfil/ocupacion-solicitante/ocupacion-solicitante.component';
import { FormularioOcupacionSolicitanteComponent } from './perfil/ocupacion-solicitante/formulario-ocupacion-solicitante/formulario-ocupacion-solicitante.component';
import { FormularioVacanteComponent } from './vacante/vacantesEmpleador/formulario-vacante/formulario-vacante.component';
import { VacantesSolicitanteComponent } from './vacante/vacantes-solicitante/vacantes-solicitante.component';
import { PostulacionEmpleadorComponent } from './postulaciones/postulacion-empleador/postulacion-empleador.component';
import { PerfilComponent } from './curriculum/perfil/perfil.component';
import { ContratacionEmpleadorComponent } from './contrataciones/contratacion-empleador/contratacion-empleador.component';

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
            { path: 'formulario', component: FormularioAdministradorComponent, data: {titulo: 'Formulario administradores'}},
        ],
    },
    {
        path: 'area-laboral',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: AreasLaboralesComponent, data: { titulo: 'Administracion de Grupos ocupacionales'}},
            { path: 'formulario', component: FormularioAreaComponent, data: { titulo: 'Formulario area laboral'}}
        ],
    },
    {
        path: 'profesion',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ProfesionComponent, data: { titulo: 'Administracion de Ocupaciones'}},
            { path: 'formulario', component: FormularioProfesionComponent, data: {titulo: 'Formulario Profesion'}},
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
        path: 'ocupaciones-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: OcupacionSolicitanteComponent, data: { titulo: 'Mis ocupaciones'}},
            { path: 'formulario', component: FormularioOcupacionSolicitanteComponent, data: { titulo: 'Formulario de Ocupacion'}},
        ],
    },
    {
        path: 'inicio-solicitante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: InicioSolicitanteComponent},
            { path: 'vacante/:id', component: VacantesSolicitanteComponent},
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
            { path: 'administracion/datos-personales', component: FormularioDatosPersonalesComponent, data: { titulo: 'Modificar Datos Personales'} },
            { path: 'administracion/encabezado', component: FormularioEncabezadoComponent, data: { titulo: 'Modificar Datos'} },
            { path: 'experiencia-laboral', component: ExperienciaLaboralComponent, data: { titulo: 'Administracion de Experiencias Laborales'} },
            { path: 'experiencia-laboral/formulario', component: FormularioExperienciaLaboralComponent, data: { titulo: 'Experiencia Laboral'} },
            { path: 'habilidad', component: HabilidadComponent, data: { titulo: 'Administracion de Habilidades'} },
            { path: 'habilidad/formulario', component: FormularioHabilidadComponent, data: { titulo: 'Habilidad'} },
            { path: 'estudio-basico', component: EstudioBasicoComponent, data: { titulo: 'Administracion de Estudios basicos'} },
            { path: 'estudio-basico/formulario', component: FormularioEstudioBasicoComponent, data: { titulo: 'Formulario de Estudios basicos'} },
            { path: 'estudio-avanzado', component: EstudioAvanzadoComponent, data: { titulo: 'Administracion de Estudios Avanzados'} },
            { path: 'estudio-avanzado/formulario', component: FormularioEstudioAvanzadoComponent, data: { titulo: 'Formulario de Estudios Avanzados'} },
            { path: 'referencia', component: ReferenciaComponent, data: { titulo: 'Administracion de Referencias'} },
            { path: 'referencia/formulario', component: FormularioReferenciaComponent, data: { titulo: 'Referencia'} },
            { path: 'idioma', component: IdiomaComponent, data: { titulo: 'Administracion de Idiomas'} },
            { path: 'idioma/formulario', component: FormularioIdiomaComponent, data: { titulo: 'Formulario de Idiomas'} },
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
        path: 'vacante',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: VacantesComponent, data: { titulo: 'Vacantes'}},
            { path: 'formulario', component: FormularioVacanteComponent, data: { titulo: 'Formulario Vacante'}},
        ],
    },
    {
        path: 'postulaciones-empleador',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostulacionEmpleadorComponent, data: { titulo: 'Postulaciones'}},
            { path: 'perfil/:id_solicitante/:id_postulacion', component: PerfilComponent, data: { titulo: 'Perfil de solicitante'}}
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
         //   { path: 'perfil/:id_solicitante/:id_postulacion', component: PerfilComponent, data: { titulo: 'Perfil de solicitante'}}
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}



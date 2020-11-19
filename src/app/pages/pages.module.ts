import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilAdministradorComponent } from './perfil/perfil-administrador/perfil-administrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AreasLaboralesComponent } from './areas-laborales/areas-laborales.component';
import { FormularioAreaComponent } from './areas-laborales/formulario-area/formulario-area.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { FormularioAdministradorComponent } from './administrador/formulario-administrador/formulario-administrador.component';
import { ProfesionComponent } from './profesion/profesion.component';
import { FormularioProfesionComponent } from './profesion/formulario-profesion/formulario-profesion.component';
import { PerfilSolicitanteComponent } from './perfil/perfil-solicitante/perfil-solicitante.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { AdministrarCurriculumComponent } from './curriculum/administrar-curriculum/administrar-curriculum.component';
import { ExperienciaLaboralComponent } from './curriculum/experiencia-laboral/experiencia-laboral.component';
import { HabilidadComponent } from './curriculum/habilidad/habilidad.component';
import { EstudioBasicoComponent } from './curriculum/estudio-basico/estudio-basico.component';
import { EstudioAvanzadoComponent } from './curriculum/estudio-avanzado/estudio-avanzado.component';
import { ReferenciaComponent } from './curriculum/referencia/referencia.component';
import { IdiomaComponent } from './curriculum/idioma/idioma.component';
import { FormularioExperienciaLaboralComponent } from './curriculum/experiencia-laboral/formulario-experiencia-laboral/formulario-experiencia-laboral.component';
import { FormularioHabilidadComponent } from './curriculum/habilidad/formulario-habilidad/formulario-habilidad.component';
import { FormularioEstudioAvanzadoComponent } from './curriculum/estudio-avanzado/formulario-estudio-avanzado/formulario-estudio-avanzado.component';
import { FormularioEstudioBasicoComponent } from './curriculum/estudio-basico/formulario-estudio-basico/formulario-estudio-basico.component';
import { FormularioIdiomaComponent } from './curriculum/idioma/formulario-idioma/formulario-idioma.component';
import { FormularioReferenciaComponent } from './curriculum/referencia/formulario-referencia/formulario-referencia.component';
import { PerfilEmpleadorComponent } from './perfil/perfil-empleador/perfil-empleador.component';
import { FormularioDatosPersonalesComponent } from './curriculum/administrar-curriculum/formulario-datos-personales/formulario-datos-personales.component';
import { FormularioEncabezadoComponent } from './curriculum/administrar-curriculum/formulario-encabezado/formulario-encabezado.component';
import { PerfilEmpresaComponent } from './perfil/perfil-empresa/perfil-empresa.component';
import { PostulacionSolicitanteComponent } from './postulaciones/postulacion-solicitante/postulacion-solicitante.component';
import { PostulacionEmpleadorComponent } from './postulaciones/postulacion-empleador/postulacion-empleador.component';
import { ContratacionSolicitanteComponent } from './contrataciones/contratacion-solicitante/contratacion-solicitante.component';
import { ContratacionEmpleadorComponent } from './contrataciones/contratacion-empleador/contratacion-empleador.component';
import { InicioSolicitanteComponent } from './inicio/inicio-solicitante/inicio-solicitante.component';
import { VacantesComponent } from './vacante/vacantes-empleador/vacantes.component';
import { OcupacionSolicitanteComponent } from './perfil/ocupacion-solicitante/ocupacion-solicitante.component';
import { FormularioOcupacionSolicitanteComponent } from './perfil/ocupacion-solicitante/formulario-ocupacion-solicitante/formulario-ocupacion-solicitante.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormularioVacanteComponent } from './vacante/vacantes-empleador/formulario-vacante/formulario-vacante.component';
import { VacantesSolicitanteComponent } from './vacante/vacantes-solicitante/vacantes-solicitante.component';
import { PerfilComponent } from './curriculum/perfil/perfil.component';
import { InicioEmpleadorComponent } from './inicio/inicio-empleador/inicio-empleador.component';
import { VistaCompletoComponent } from './curriculum/vista-completo/vista-completo.component';
import { OperacionesComponent } from './curriculum/vista-completo/operaciones/operaciones.component';
import { VerAdministradorComponent } from './administrador/ver-administrador/ver-administrador.component';
import { VerContratacionComponent } from './contrataciones/contratacion-empleador/ver-contratacion/ver-contratacion.component';
import { VerVacanteEmpleadorComponent } from './vacante/vacantes-empleador/ver-vacante-empleador/ver-vacante-empleador.component';
import { VerExperienciaLaboralComponent } from './curriculum/experiencia-laboral/ver-experiencia-laboral/ver-experiencia-laboral.component';
import { VerEstudioBasicoComponent } from './curriculum/estudio-basico/ver-estudio-basico/ver-estudio-basico.component';
import { VerEstudioAvanzadoComponent } from './curriculum/estudio-avanzado/ver-estudio-avanzado/ver-estudio-avanzado.component';
import { VerReferenciaComponent } from './curriculum/referencia/ver-referencia/ver-referencia.component';
import { VerIdiomaComponent } from './curriculum/idioma/ver-idioma/ver-idioma.component';
import { FotoSolicitanteComponent } from './perfil/foto/foto-solicitante/foto-solicitante.component';
import { FotoEmpleadorComponent } from './perfil/foto/foto-empleador/foto-empleador.component';
import { FotoEmpresaComponent } from './perfil/foto/foto-empresa/foto-empresa.component';
import { FotoAdministradorComponent } from './perfil/foto/foto-administrador/foto-administrador.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    PerfilAdministradorComponent,
    AreasLaboralesComponent,
    FormularioAreaComponent,
    AdministradorComponent,
    FormularioAdministradorComponent,
    ProfesionComponent,
    FormularioProfesionComponent,
    PerfilSolicitanteComponent,
    CurriculumComponent,
    AdministrarCurriculumComponent,
    ExperienciaLaboralComponent,
    HabilidadComponent,
    EstudioBasicoComponent,
    EstudioAvanzadoComponent,
    ReferenciaComponent,
    IdiomaComponent,
    FormularioExperienciaLaboralComponent,
    FormularioHabilidadComponent,
    FormularioEstudioAvanzadoComponent,
    FormularioEstudioBasicoComponent,
    FormularioIdiomaComponent,
    FormularioReferenciaComponent,
    PerfilEmpleadorComponent,
    FormularioDatosPersonalesComponent,
    FormularioEncabezadoComponent,
    PerfilEmpresaComponent,
    PostulacionSolicitanteComponent,
    PostulacionEmpleadorComponent,
    ContratacionSolicitanteComponent,
    ContratacionEmpleadorComponent,
    InicioSolicitanteComponent,
    VacantesComponent,
    OcupacionSolicitanteComponent,
    FormularioOcupacionSolicitanteComponent,
    FormularioVacanteComponent,
    VacantesSolicitanteComponent,
    PerfilComponent,
    InicioEmpleadorComponent,
    VistaCompletoComponent,
    OperacionesComponent,
    VerAdministradorComponent,
    VerContratacionComponent,
    VerVacanteEmpleadorComponent,
    VerExperienciaLaboralComponent,
    VerEstudioBasicoComponent,
    VerEstudioAvanzadoComponent,
    VerReferenciaComponent,
    VerIdiomaComponent,
    FotoSolicitanteComponent,
    FotoEmpleadorComponent,
    FotoEmpresaComponent,
    FotoAdministradorComponent,
    ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PagesModule { }

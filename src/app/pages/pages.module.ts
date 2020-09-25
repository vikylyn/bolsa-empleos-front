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
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PagesModule { }

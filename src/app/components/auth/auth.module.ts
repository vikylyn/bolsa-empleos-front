import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegistroSolicitanteComponent } from './register/registro-solicitante/registro-solicitante.component';
import { RegistroEmpleadorComponent } from './register/registro-empleador/registro-empleador.component';
import { ActivacionComponent } from './activacion/activacion.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { EjecutarRestablecerPasswordComponent } from './ejecutar-restablecer-password/ejecutar-restablecer-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegistroSolicitanteComponent,
    RegistroEmpleadorComponent,
    ActivacionComponent,
    RestablecerPasswordComponent,
    EjecutarRestablecerPasswordComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }

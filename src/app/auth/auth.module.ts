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
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegistroSolicitanteComponent,
    RegistroEmpleadorComponent,
    ActivacionComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }

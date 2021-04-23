import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegistroSolicitanteComponent } from './register/registro-solicitante/registro-solicitante.component';
import { RegistroEmpleadorComponent } from './register/registro-empleador/registro-empleador.component';
import { ActivacionComponent } from './activacion/activacion.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { EjecutarRestablecerPasswordComponent } from './ejecutar-restablecer-password/ejecutar-restablecer-password.component';

const routes: Routes = [

    { path: 'registro', component: RegisterComponent},
    {path: 'registro/solicitante', component: RegistroSolicitanteComponent},
    {path: 'registro/empleador', component: RegistroEmpleadorComponent},
    {path: ':usuario/activacion/:id', component: ActivacionComponent},
    {path: 'password', component: RestablecerPasswordComponent},
    {path: 'password/:idCredenciales', component: EjecutarRestablecerPasswordComponent},
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}

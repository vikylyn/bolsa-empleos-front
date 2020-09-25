import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegistroSolicitanteComponent } from './register/registro-solicitante/registro-solicitante.component';
import { RegistroEmpleadorComponent } from './register/registro-empleador/registro-empleador.component';
import { ActivacionComponent } from './activacion/activacion.component';

const routes: Routes = [

    { path: 'registro', component: RegisterComponent},
    {path: 'registro/solicitante', component: RegistroSolicitanteComponent},
    {path: 'registro/empleador', component: RegistroEmpleadorComponent},
    {path: ':usuario/activacion/:id', component: ActivacionComponent},
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}

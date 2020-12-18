import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NotificacionesComponent } from './header/notificaciones/notificaciones.component';
import { NotificacionesEmpleadorComponent } from './header/notificaciones-empleador/notificaciones-empleador.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NotificacionesComponent,
    NotificacionesEmpleadorComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }

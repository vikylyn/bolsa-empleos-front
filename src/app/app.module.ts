
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './components/pages/pages.module';

import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

// espanol
import {registerLocaleData} from '@angular/common';
import localEs from '@angular/common/locales/es';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';
import { RouterModule } from '@angular/router';


// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
registerLocaleData(localEs);

const config: SocketIoConfig = {
  url: environment.base_url,
  options: {
    //autoConnect : false
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

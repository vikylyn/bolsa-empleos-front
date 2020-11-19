import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../services/websocket/websocket.service';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  email: string;

  public registerForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    recuerdame: [false]
  });
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private loginService: LoginService,
    public wsService: WebsocketService
  ) { 
    this.loginService.logout();
  }

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
  }
  ingresar(): any {
    this.formSubmitted = true;
    if ( this.registerForm.invalid ) {
      return;
    }
    this.loginService.login(this.registerForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Bienvenido', this.registerForm.get('email').value, 'success');
          if (resp.usuario.credenciales.rol.nombre === 'ROLE_SOLICITANTE') {
            this.wsService.loginWS().then(() => {
              this.router.navigate(['/inicio-solicitante']);
            });
          }else if (resp.usuario.credenciales.rol.nombre === 'ROLE_EMPLEADOR') {
            this.wsService.loginWS().then(() => {
              this.router.navigate(['/inicio-empleador']);
            });
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, (err) => {
         Swal.fire('Error al ingresar', err.error.mensaje, 'error');
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
}

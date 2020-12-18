import { Component, OnInit } from '@angular/core';
import { CredencialesService } from '../../services/credenciales.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css']
})
export class RestablecerPasswordComponent implements OnInit {
  email: string;
  formSubmitted = false;

  constructor(private credencialesService: CredencialesService,
              private fb: FormBuilder,
              public router: Router) { }
  public emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  ngOnInit(): void {
    init_plugins();

  }
  restablecerPassword(): void {
    this.formSubmitted = true;
    if (this.emailForm.invalid) {
      return;
    }
    console.log(this.emailForm.value);
    this.credencialesService.restablecerPasswordEnviarEmail(this.emailForm.value).subscribe((resp: any) => {
      console.log(resp);
      Swal.fire(resp.mensaje, '', 'success');
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.log(err);
      Swal.fire('Error al restablecer contraseña', err.error.error || err.error.mensaje, 'error');
    });
  }

  campoNoValido( campo: string): boolean {
    if (this.emailForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CredencialesService } from '../../../services/credenciales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare function init_plugins();

@Component({
  selector: 'app-ejecutar-restablecer-password',
  templateUrl: './ejecutar-restablecer-password.component.html',
  styleUrls: ['./ejecutar-restablecer-password.component.css']
})
export class EjecutarRestablecerPasswordComponent implements OnInit {
  idCredencial: number;
  token: string;
  formSubmitted = false;

  constructor(private credencialesService: CredencialesService,private route: ActivatedRoute,
              private fb: FormBuilder,
              public router: Router,) { }

  ngOnInit(): void {
    init_plugins();
    this.route.queryParams
    .subscribe(params => {
      this.idCredencial = this.route.snapshot.params.idCredenciales;
      this.token = params.token;
    });
  }
  public passwordForm = this.fb.group({
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });
  passwordsIguales(pass1Name: string, pass2Name: string): any {
    return ( group: FormGroup) => {
      let pass1 = group.controls[pass1Name].value;
      let pass2 = group.controls[pass2Name].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        passwordsIguales: true
      };
    };
  }
  restablecerPassword(): any {
    this.formSubmitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Estas seguro de restablecer su contraseña?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Restablecer!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.credencialesService.restablecerPassword(this.passwordForm.value, this.idCredencial, this.token).subscribe((resp: any) => {
          Swal.fire(resp.mensaje, '', 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Error al restablecer password', err.error.mensaje, 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }
  campoNoValido( campo: string): boolean {
    if (this.passwordForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  contrasenasNovalidas(): boolean {
    const pass1 = this.passwordForm.get('password').value;
    const pass2 = this.passwordForm.get('password2').value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
}

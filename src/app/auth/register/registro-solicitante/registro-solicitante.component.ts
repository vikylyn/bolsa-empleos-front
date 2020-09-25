import { Component, OnInit } from '@angular/core'; 
import { Profesion } from '../../../models/profesion/profesion.model';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { EstadoCivil } from '../../../models/estado-civil.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitanteService } from '../../../services/solicitante/solicitante.service';
import { ProfesionService } from '../../../services/administrador/profesion.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { EstadoCivilService } from '../../../services/solicitante/estado-civil.service';
import Swal from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-registro-solicitante',
  templateUrl: './registro-solicitante.component.html',
  styles: [
  ]
})
export class RegistroSolicitanteComponent implements OnInit {

  profesiones: Profesion[];
  paises: Pais[];
  ciudades: Ciudad[];
  estados_civiles: EstadoCivil[];
  formSubmitted = false;


  constructor(private fb: FormBuilder,
              public router: Router,
              private solicitanteService: SolicitanteService,
              private profesionService: ProfesionService,
              private ubicacionService: UbicacionService,
              private estadoCivilService: EstadoCivilService)
    {
      this.profesionService.listarProfesiones()
          .subscribe( (resp: Profesion[]) => {
            console.log('profesiones');
            this.profesiones = resp;
          }, (err) => console.log(err));
      this.ubicacionService.listarPaises()
          .subscribe( (resp: Pais[]) => {
            this.paises = resp;
          });
      this.ubicacionService.listarCiudades(1)
          .subscribe((resp: Ciudad[]) => {
            this.ciudades = resp;
          });
      this.estadoCivilService.listar()
          .subscribe((resp: EstadoCivil []) => {
            this.estados_civiles = resp;
          });
    }

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    nacionalidad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    genero: [ 0 , Validators.required],
    fecha_nac: ['', Validators.required],
    id_profesion: [0, Validators.required],
    id_estado_civil: [0 , Validators.required],
    id_pais: [0, Validators.required],
    id_ciudad: [0, Validators.required],
    id_rol: [2, [Validators.required]]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  ngOnInit(): void {
    init_plugins();
  }
  adicionarSolicitante(): void {
    this.formSubmitted = true;
    if (
        this.registerForm.get('genero').value === 0 ||
        this.registerForm.get('id_profesion').value === 0 ||
        this.registerForm.get('id_ciudad').value === 0 ||
        this.registerForm.get('id_estado_civil').value === 0 ||
        this.registerForm.get('id_pais').value === 0 ) {
      return;
    }
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.solicitanteService.adicionarSolicitante(this.registerForm.value)
        .subscribe( (resp: any) => {
          console.log('solicitante creado');
          Swal.fire(resp.mensaje, this.registerForm.get('email').value, 'success');
          this.router.navigate(['/login']);
        }, (err) => {
          console.log(err);
          Swal.fire('Error al crear Solicitante', err.error.mensaje, 'error');
        });
  }

  campoNoValido( campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  selectNoValido( campo: string): boolean {
    const id = this.registerForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  contrasenasNovalidas(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
  passwordsIguales(pass1Name: string, pass2Name: string) {
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

}

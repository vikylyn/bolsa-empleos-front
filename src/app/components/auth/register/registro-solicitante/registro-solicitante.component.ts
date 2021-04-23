import { Component, OnInit } from '@angular/core'; 
import { Ocupacion } from '../../../../models/ocupacion/ocupacion.model';
import { Pais } from '../../../../models/pais.model';
import { Ciudad } from '../../../../models/ciudad.model';
import { EstadoCivil } from '../../../../models/estado-civil.model';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitanteService } from '../../../../services/solicitante/solicitante.service';
import { OcupacionService } from '../../../../services/administrador/ocupacion.service';
import { UbicacionService } from '../../../../services/ubicacion/ubicacion.service';
import { EstadoCivilService } from '../../../../services/solicitante/estado-civil.service';
import Swal from 'sweetalert2';
declare function init_plugins();


@Component({
  selector: 'app-registro-solicitante',
  templateUrl: './registro-solicitante.component.html',
  styles: [
  ]
})
export class RegistroSolicitanteComponent implements OnInit {

  profesiones: Ocupacion[];
  paises: Pais[];
  ciudades: Ciudad[];
  estados_civiles: EstadoCivil[];
  formSubmitted = false;
  fechaActual: Date = new Date();
  fechaLimiteInf: Date  = new Date();
  cargando = false;
  dias: any[] = [];

  meses: any[] = [
    {id: 1 , valor: 'enero'},
    {id: 2, valor: 'febrero'},
    {id: 3, valor: 'marzo'},
    {id: 4, valor: 'abril'},
    {id: 5, valor: 'mayo'},
    {id: 6, valor: 'junio'},
    {id: 7, valor: 'julio'},
    {id: 8, valor: 'agosto'},
    {id: 9, valor: 'septiembre'},
    {id: 10, valor: 'octubre'},
    {id: 11, valor: 'noviembre'},
    {id: 12, valor: 'diciembre'},
  ];

  anios: any[] = [];

  constructor(private fb: FormBuilder,
              public router: Router,
              private solicitanteService: SolicitanteService,
              private ocupacionService: OcupacionService,
              private ubicacionService: UbicacionService,
              private estadoCivilService: EstadoCivilService)
    {
      this.fechaLimiteInf.setFullYear(this.fechaActual.getFullYear() - 18);
      this.cargarFechas();
    }

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    num_complemento_ci: [''],
    telefono: ['', [Validators.required]],
    nacionalidad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    genero: [ 'seleccionar' , [Validators.required, Validators.maxLength(1)]],
    id_profesion: [null , [Validators.required, Validators.minLength(1)]],
    id_estado_civil: [0 , [Validators.required, Validators.min(1)]],
    id_pais: [1, [Validators.required]],
    id_ciudad: [null, [Validators.required, Validators.min(1)]],
    id_rol: [2, [Validators.required]],
    dia: [new Date().getDate(), [Validators.required, Validators.min(1)]],
    mes: [new Date().getMonth() + 1, [Validators.required, Validators.min(1)]],
    anio: [new Date().getFullYear()-18, [Validators.required, Validators.max(new Date().getFullYear()-18), Validators.min(new Date().getFullYear()-118)]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  ngOnInit(): void {
    this.ocupacionService.listarProfesiones()
    .subscribe( (resp: Ocupacion[]) => {
      this.profesiones = resp;
    }, (err) => console.log(err));
    this.ubicacionService.listarPaises()
        .subscribe( (resp: Pais[]) => {
          this.paises = resp.filter( (pais: Pais) => pais.nombre === 'Bolivia');
        });
    this.ubicacionService.listarCiudades(1)
        .subscribe((resp: Ciudad[]) => {
          this.ciudades = resp;
        });
    this.estadoCivilService.listar()
    .subscribe((resp: EstadoCivil []) => {
      this.estados_civiles = resp;
    });
    init_plugins();
  }
  cargarFechas(){
    let inicio = this.fechaActual.getFullYear() - 18;
    let fin = this.fechaActual.getFullYear() - 118;
    for (let index = inicio; index >= fin; index--) {
      let anio: any = {id: index, valor: index};
      this.anios.push(anio);
    }
    for (let index = 1; index <= 31; index++) {
      this.dias.push({id: index, valor: index})
    }
  }
  adicionarSolicitante(): void {
    console.log(this.registerForm);
    let dia = this.registerForm.get('dia').value;
    let mes = this.registerForm.get('mes').value;
    let anio = this.registerForm.get('anio').value;
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (!this.existeFecha(dia + '/' + mes + '/' + anio)  && this.formSubmitted) {
      return;
    }
    this.cargando = true;
    let fechaObj = {
      fecha_nac: anio + '-' + mes + '-' + dia
    };
    const form = Object.assign(this.registerForm.value, fechaObj);
    this.solicitanteService.adicionarSolicitante(form)
        .subscribe( (resp: any) => {
          Swal.fire(resp.mensaje, this.registerForm.get('email').value, 'success');
          this.cargando = false;
          this.router.navigate(['/login']);
        }, (err) => {
          console.log(err);
          Swal.fire('Error al crear Solicitante', err.error.mensaje, 'error');
          this.cargando = false;
        });
  }

  campoNoValido( campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.registerForm.get(campo).touched) {
      return true;
    }else if (this.registerForm.get(campo).invalid && this.formSubmitted) {
        return true;
    }else {
      return false;
    }
  }

  validarFecha():boolean {
    let dia = this.registerForm.get('dia').value;
    let mes = this.registerForm.get('mes').value;
    let anio = this.registerForm.get('anio').value;
    let fecha: Date = new Date(anio+'-'+mes+'-'+dia);
    if (fecha > this.fechaLimiteInf && this.formSubmitted) {
      return true;
    }
    if(fecha <= this.fechaLimiteInf! && !this.existeFecha(dia+'/'+mes+'/'+anio)  && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  existeFecha(fecha){
    var fechaf = fecha.split("/");
        var d = fechaf[0];
        var m = fechaf[1];
        var y = fechaf[2];
        return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
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

  minlength(): boolean {
    if (this.registerForm.controls.password.errors && this.registerForm.controls.password.errors.minlength) {
      return true;
    }else {
      return false;
    }
  }

  email(): boolean {
    if (this.registerForm.controls.email.errors && this.registerForm.controls.email.errors.email) {
      return true;
    }else {
      return false;
    }
  }


}

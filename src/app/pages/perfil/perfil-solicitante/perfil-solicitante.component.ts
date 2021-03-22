import { Component, OnInit } from '@angular/core';
import { Solicitante } from '../../../models/solicitante/solicitante.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SolicitanteService } from '../../../services/solicitante/solicitante.service';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { EstadoCivil } from '../../../models/estado-civil.model';
import { Pais } from '../../../models/pais.model';
import { Ciudad } from '../../../models/ciudad.model';
import { EstadoCivilService } from '../../../services/solicitante/estado-civil.service';
import { UbicacionService } from '../../../services/ubicacion/ubicacion.service';
import { WebsocketService } from '../../../services/websocket/websocket.service';

@Component({
  selector: 'app-perfil-solicitante',
  templateUrl: './perfil-solicitante.component.html',
  styles: [
  ]
})
export class PerfilSolicitanteComponent implements OnInit {
  fechaActual: Date = new Date();
  fechaLimiteInf: Date  = new Date();
  cargando = false;
  formSubmitted = false;
  solicitante: Solicitante;
  perfilForm: FormGroup;
  cargarformulario = false;
  estados_civiles: EstadoCivil[];
  paises: Pais[];
  ciudades: Ciudad[];
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
              private solicitanteService: SolicitanteService,
              private loginService: LoginService,
              private ubicacionService: UbicacionService,
              private wsService: WebsocketService,
              private estadoCivilService: EstadoCivilService) {
                this.fechaLimiteInf.setFullYear(this.fechaActual.getFullYear() - 18);
                this.cargarFechas();
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
  cargarFechas(){
    let inicio = this.fechaActual.getFullYear() - 18;
    let fin = 1920;
   
    for (let index = inicio; index >= fin; index--) {
      let anio: any = {id: index, valor: index};
      this.anios.push(anio);
    }
    for (let index = 1; index <= 31; index++) {
      this.dias.push({id: index, valor: index})
    }
  }
  ngOnInit(): void {
    this.solicitanteService.buscar(this.loginService.solicitante.id)
          .subscribe( (resp: Solicitante) => {
          this.solicitante = resp;
          let fechanac: string = this.solicitante.fecha_nac.toString();
          let fecha: string [] = fechanac.split('-');
          this.cargarformulario = true;
          this.perfilForm = this.fb.group({
            nombre: [this.solicitante.nombre, [ Validators.required]],
            apellidos: [this.solicitante.apellidos, [Validators.required]],
            email: [this.solicitante.credenciales.email, [Validators.required, Validators.email]],
            cedula: [this.solicitante.cedula, [Validators.required]],
            num_complemento_ci: [this.solicitante.num_complemento_ci],
            telefono: [this.solicitante.telefono, [Validators.required]],
            nacionalidad: [this.solicitante.nacionalidad, [Validators.required]],
            direccion: [this.solicitante.direccion, [Validators.required]],
            genero: [ this.solicitante.genero , Validators.required],
            id_estado_civil: [ this.solicitante.estado_civil.id, Validators.required],
            id_pais: [1, Validators.required],
            id_ciudad: [this.solicitante.ciudad.id, Validators.required],
            habilitado: [true],
            dia: [fecha[2], [Validators.required, Validators.min(1)]],
            mes: [parseInt(fecha[1]), [Validators.required, Validators.min(1)]],
            anio: [fecha[0], [Validators.required,Validators.min(1)]],
  
       //     id_profesion: [this.solicitante.profesion.id]
      });
    });
  }
  guardar(): void {
    this.formSubmitted = true;
    let dia = this.perfilForm.get('dia').value;
    let mes = this.perfilForm.get('mes').value;
    let anio = this.perfilForm.get('anio').value;
    if (this.perfilForm.invalid) {
      return;
    }
    if(!this.existeFecha(dia+'/'+mes+'/'+anio)  && this.formSubmitted) {
      return;
    }
    this.cargando = true;
    let fechaObj = {
      fecha_nac: anio+'-'+mes+'-'+dia
    };
    const form = Object.assign(this.perfilForm.value, fechaObj);
    this.solicitanteService.modificar(form, this.loginService.solicitante.id)
        .subscribe( (resp: any) => {
          this.cargando = false;
          Swal.fire(resp.mensaje, this.perfilForm.get('email').value, 'success');
          // modificando la variable solicitante de loginService para actualizar los atributos cambiados del sidebar y header
          this.solicitanteService.buscar(this.loginService.solicitante.id).subscribe(( respuesta: Solicitante) => {
              this.loginService.guardarStorage(respuesta, this.loginService.token);
              this.wsService.emitir('actualizar-usuario');
          });
        }, (err) => {
          console.log(err);
          Swal.fire('Error al modificar perfil', err.error.error || err.error.mensaje, 'error');
        });
  }

  campoNoValido( campo: string): boolean {
    if (this.perfilForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }
  selectNoValido( campo: string): boolean {
    const id = this.perfilForm.get(campo).value;
    if ( id === 0 && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }


  seleccionarPais(): void{
    const id_pais = this.perfilForm.get('id_pais').value;
    this.ubicacionService.listarCiudades(id_pais)
    .subscribe((resp: Ciudad[]) => {
      this.ciudades = resp;
    });
  }

  validarFecha():boolean {
    let dia = this.perfilForm.get('dia').value;
    let mes = this.perfilForm.get('mes').value;
    let anio = this.perfilForm.get('anio').value;
    let fecha: Date = new Date(anio+'-'+mes+'-'+dia);
    if (fecha > this.fechaLimiteInf && this.formSubmitted) {
      return true;
    }
    if(!this.existeFecha(dia+'/'+mes+'/'+anio)  && this.formSubmitted) {
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
}

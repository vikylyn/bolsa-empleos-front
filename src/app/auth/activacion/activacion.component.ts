import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivacionService } from '../../services/activacion.service';
import Swal from 'sweetalert2';
declare function init_plugins();
@Component({
  selector: 'app-activacion',
  templateUrl: './activacion.component.html',
  styleUrls: [ './activacion.component.css']

})
export class ActivacionComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private activacionService: ActivacionService) { }

  ngOnInit(): void {
    init_plugins();
    this.route.queryParams
    .subscribe(params => {
      this.activacionService.activar(this.route.snapshot.params.id, this.route.snapshot.params.usuario, params.token)
      .subscribe((resp: any) => {
        Swal.fire(resp.mensaje, '', 'success');
      }, (err) => {
        console.log(err);
        Swal.fire('Error al crear Empleador', err.mensaje || err.error || err.error.mensaje, 'error');
      });
    });
  }
}

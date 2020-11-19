import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Curriculum } from '../../../models/curriculum/curriculum.model';
import { CurriculumService } from '../../../services/solicitante/curriculum/curriculum.service';
import { Columns, Img, PdfMakeWrapper } from 'pdfmake-wrapper';
//import pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
//PdfMakeWrapper.setFonts(pdfFonts);


@Component({
  selector: 'app-vista-completo',
  templateUrl: './vista-completo.component.html',
  styles: [
  ]
})
export class VistaCompletoComponent implements OnInit {
  @Input() visible: boolean;
  @Input() idCurriculum: number;
  @Input() tipoOperacion: string;
  @Input() idSolicitante: number;
  // para enviar al componente operacion el id de una postulacion o contratacion
  @Input() idOperacion = 0;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  curriculum: Curriculum;

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit(): void {
    this.curriculumService.buscarPorIdSolicitanteCompleto(this.idSolicitante)
        .subscribe(({curriculum}) => {
          this.curriculum = curriculum;
        });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }

  async descargarPDF(): Promise<any> {
    const pdf = new PdfMakeWrapper();
    pdf.add(this.curriculum.titulo);
    pdf.add(new Columns([
      await (await new Img(this.curriculum.solicitante.imagen.url).width(100).build()) , 'world' ]).end);
    pdf.create().open();
  }

}

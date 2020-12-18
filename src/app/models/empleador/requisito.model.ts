import { Ocupacion } from '../ocupacion/ocupacion.model';
import { RequisitosIdioma } from './requisitos-idioma.model';
export class Requisitos {
    constructor(
        public experiencia: number,
        public genero: string,
        public ocupacion: Ocupacion,
        public idiomas: RequisitosIdioma[],
        public id?: number,

    ){}
}
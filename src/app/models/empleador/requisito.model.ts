import { Idioma } from '../idioma/idioma.model';
import { Ocupacion } from '../ocupacion/ocupacion.model';
export class Requisitos {
    constructor(
        public experiencia: number,
        public genero: string,
        public ocupacion: Ocupacion,
        public idioma: Idioma,
        public id?: number,

    ){}
}
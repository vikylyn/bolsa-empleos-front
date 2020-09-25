import { Idioma } from '../idioma/idioma.model';
import { Profesion } from '../profesion/profesion.model';
export class Requisitos {
    constructor(
        public experiencia: number,
        public genero: string,
        public profesion: Profesion,
        public idioma: Idioma,
        public id?: number,

    ){}
}
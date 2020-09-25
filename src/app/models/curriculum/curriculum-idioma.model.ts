import { Curriculum } from './curriculum.model';
import { Idioma } from '../idioma/idioma.model';
import { NivelIdioma } from '../idioma/nivel-idioma.model';
export class CurriculumIdioma {
    constructor(
        public curriculum: Curriculum,
        public idioma: Idioma,
        public nivel_escrito: NivelIdioma,
        public nivel_oral: NivelIdioma,
        public nivel_lectura: NivelIdioma,
        public id?: number,
    ){}
}

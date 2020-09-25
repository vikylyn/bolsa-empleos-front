import { Curriculum } from './curriculum.model';
import { Habilidad } from './habilidad.model';
export class CurriculumHabilidad {
    constructor(
        public curriculum: Curriculum,
        public habilidad: Habilidad,
        public id?: number,
    ){}
}

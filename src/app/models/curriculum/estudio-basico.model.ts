import { Curriculum } from './curriculum.model';
import { Pais } from '../pais.model';
import { GradoEscolar } from '../estudio/grado-escolar.model';
export class EstudioBasico {
    constructor(
        public colegio: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public estado: string,
        public ciudad: string,
        public curriculum: Curriculum,
        public pais: Pais,
        public grado_inicio: GradoEscolar,
        public grado_fin: GradoEscolar,
        public id?: number
    ){}
}

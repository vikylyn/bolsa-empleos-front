import { Curriculum } from './curriculum.model';
import { Pais } from '../pais.model';
import { NivelEstudio } from '../estudio/nivel-estudio.model';
export class EstudioAvanzado {
    constructor(
        public institucion: string,
        public carrera: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public estado: string,
        public ciudad: string,
        public curriculum: Curriculum,
        public pais: Pais,
        public nivel_estudio: NivelEstudio,
        public id?: number
    ) {}
}

import { Curriculum } from './curriculum.model';
import { Pais } from '../pais.model';
import { GradoEscolar } from '../estudio/grado-escolar.model';
import { Ciudad } from '../ciudad.model';
import { OtraCiudadEBasico } from './otrasCiudades/otraCiudadEBasico.model';
export class EstudioBasico {
    constructor(
        public colegio: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public ciudad: Ciudad,
        public curriculum: Curriculum,
        public grado_inicio: GradoEscolar,
        public grado_fin: GradoEscolar,
        public otraCiudad?: OtraCiudadEBasico,
        public id?: number
    ){}
}

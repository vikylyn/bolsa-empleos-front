import { Curriculum } from './curriculum.model';
import { NivelEstudio } from '../estudio/nivel-estudio.model';
import { Ciudad } from '../ciudad.model';
import { OtraCiudadEAvanzado } from './otrasCiudades/otraCiudadEAvanzado.model';
export class EstudioAvanzado {
    constructor(
        public institucion: string,
        public carrera: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public estado: string,
        public ciudad: Ciudad,
        public curriculum: Curriculum,
        public nivel_estudio: NivelEstudio,
        public otraCiudad?: OtraCiudadEAvanzado,
        public id?: number
    ) {}
}

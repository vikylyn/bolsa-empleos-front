import { Curriculum } from './curriculum.model';
import { TipoContrato } from '../empleador/tipo-contrato.model';
import { OtraCiudadExperienciaLaboral } from './otrasCiudades/otraCiudadExperienciaLaboral.model';
import { Ciudad } from '../ciudad.model';
export class ExperienciaLaboral {
    constructor(
        public empresa: string,
        public puesto: string,
        public descripcion: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public tipo_contrato: TipoContrato,
        public curriculum: Curriculum,
        public ciudad: Ciudad,
        public otraCiudad?: OtraCiudadExperienciaLaboral,
        public id?: number
    ){}
}

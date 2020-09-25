import { Pais } from '../pais.model';
import { Curriculum } from './curriculum.model';
import { AreaLaboral } from '../profesion/area-laboral.model';
export class ExperienciaLaboral {
    constructor(
        public empresa: string,
        public puesto: string,
        public descripcion: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public estado: string,
        public ciudad: string,
        public area_laboral: AreaLaboral,
        public curriculum: Curriculum,
        public pais: Pais,
        public id?: number
    ){}
}

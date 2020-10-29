import { Pais } from '../pais.model';
import { Curriculum } from './curriculum.model';
import { GrupoOcupacional } from '../ocupacion/grupo-ocupacional.model';
import { TipoContrato } from '../empleador/tipo-contrato.model';
export class ExperienciaLaboral {
    constructor(
        public empresa: string,
        public puesto: string,
        public descripcion: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public estado: string,
        public ciudad: string,
        public tipo_contrato: TipoContrato,
   //     public grupo_ocupacional: GrupoOcupacional,
        public curriculum: Curriculum,
        public pais: Pais,
        public id?: number
    ){}
}

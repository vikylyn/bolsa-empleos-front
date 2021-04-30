import { Administrador } from '../administrador/administrador.model';
import { GrupoOcupacional } from './grupo-ocupacional.model';
export class Ocupacion {
    constructor(
        public nombre: string,
        public habilitado: boolean,
        public area_laboral: GrupoOcupacional,
        public creado_por: Administrador,
        public modificado_por: Administrador,
        public creado_en: Date,
        public modificado_en: Date,
        public grupo_ocupacional: GrupoOcupacional,
        public id?: number,
    ) {
    }
}

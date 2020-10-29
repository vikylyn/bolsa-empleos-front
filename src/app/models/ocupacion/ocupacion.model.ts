import { Administrador } from '../administrador/administrador.model';
import { GrupoOcupacional } from './grupo-ocupacional.model';
export class Ocupacion {
    constructor(
        public nombre: string,
        public habilitado: boolean,
        public area_laboral: GrupoOcupacional,
        public administrador: Administrador,
        public grupo_ocupacional: GrupoOcupacional,
        public id?: number,
    ) {
    }
}

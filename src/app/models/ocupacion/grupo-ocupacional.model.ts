import { Administrador } from '../administrador/administrador.model';
export class GrupoOcupacional {
    constructor(
        public nombre: string,
        public habilitado: boolean,
        public creado_por: Administrador,
        public modificado_por: Administrador,
        public creado_en: Date,
        public modificado_en: Date,
        public id?: number
    ){}
}

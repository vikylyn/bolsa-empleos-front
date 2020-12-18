import { Administrador } from '../administrador/administrador.model';
export class GrupoOcupacional {
    constructor(
        public nombre: string,
        public habilitado: boolean,
        public administrador: Administrador,
    //    public codigo: string,
        public id?: number
    ){}
}

import { Administrador } from '../administrador/administrador.model';
export class AreaLaboral {
    constructor(
        public nombre: string,
        public habilitado: boolean,
        public administrador: Administrador,
        public id?: number
    ){}
}
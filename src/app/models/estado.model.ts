import { Pais } from './pais.model';
export class Estado {
    constructor(
        public nombre: string,
        public pais: Pais,
        public id?: number,
    ){
    }
}
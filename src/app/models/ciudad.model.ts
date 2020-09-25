import { Estado } from './estado.model';
export class Ciudad {
    constructor(
        public nombre: string,
        public estado: Estado,
        public id?: number,
    ){
    }
}
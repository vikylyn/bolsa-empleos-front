import { Rol } from './rol.model';
export class Credenciales {
    constructor(
        public email: string,
        public password: string,
        public rol: Rol,
        public id?: number,
    ){
    }
}
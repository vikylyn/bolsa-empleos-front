import { Curriculum } from './curriculum.model';
export class Referencia {
    constructor(
        public nombre: string,
        public apellidos: string,
        public empresa: string,
        public cargo: string,
        public telefono: string,
        public curriculum: Curriculum,
        public id?: number,
    ) {}
}

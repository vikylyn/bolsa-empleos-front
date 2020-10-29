import { Solicitante } from '../solicitante/solicitante.model';
import { Vacante } from './vacante.model';

export class Contratacion {
    constructor(
        public vacante: Vacante,
        public solicitante: Solicitante,
        public habilitado: boolean,
        public confirmado: boolean,
        public creado_en: Date,
        public id?: number
    ){

    }
}

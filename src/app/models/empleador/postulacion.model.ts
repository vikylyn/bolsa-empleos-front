import { Solicitante } from '../solicitante/solicitante.model';
import { Vacante } from './vacante.model';

export class Postulacion {
    constructor(
        public vacante: Vacante,
        public solicitante: Solicitante,
        public aceptado: boolean,
        public rechazado: boolean,
        public favorito: boolean,
        public creado_en: Date,
        public id?: number
    ){

    }
}

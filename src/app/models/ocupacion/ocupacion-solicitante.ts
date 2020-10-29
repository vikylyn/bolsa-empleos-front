import { Solicitante } from '../solicitante/solicitante.model';
import { Ocupacion } from './ocupacion.model';
export class OcupacionSolicitante {
    constructor(
        public habilitado: boolean,
        public solicitante: Solicitante,
        public ocupacion: Ocupacion,
        public id: number
    ) {
    }
}

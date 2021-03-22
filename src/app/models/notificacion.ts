import { Solicitante } from './solicitante/solicitante.model';
import { Empleador } from './empleador/empleador.model';
import { Vacante } from './empleador/vacante.model';
import { TipoNotificacion } from './tipo-notificacion';

export class Notificacion {
    constructor(
        public leido: boolean,
        public solicitante: Solicitante,
       // public empleador: Empleador,
        public vacante: Vacante,
        public tipo_notificacion: TipoNotificacion,
        public id?: number,
        public creado_en?: Date
   ){}
}

import { RangoSueldo } from './rango-sueldo.model';
import { Horario } from './horario.model';
import { Requisitos } from './requisito.model';
import { TipoContrato } from './tipo-contrato.model';
import { Ciudad } from '../ciudad.model';
import { Empleador } from './empleador.model';
import { PeriodoPago } from './periodo-pago.model';
import { TipoJornada } from './tipo-jornada.model';
export class Vacante {
    constructor(
        public titulo: string,
        public sueldo: RangoSueldo,
        public periodo_pago: PeriodoPago,
        public direccion: string,
        public horario: Horario,
        public num_vacantes: number,
        public num_disponibles: number,
        public descripcion: string,
        public creado_en: Date,
        public habilitado: boolean,
        public requisitos: Requisitos,
        public tipo_contrato: TipoContrato,
        public ciudad: Ciudad,
        public empleador: Empleador,
        public num_postulantes_aceptados: number,
        public tipo_jornada: TipoJornada,
        public id?: number,
    ) {
    }
}

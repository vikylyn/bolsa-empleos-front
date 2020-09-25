import { RangoSueldo } from './rango-sueldo.model';
import { Horario } from './horario.model';
import { Requisitos } from './requisito.model';
import { TipoContrato } from './tipo-contrato.model';
import { Ciudad } from '../ciudad.model';
import { Empleador } from './empleador.model';
export class Vacante {
    constructor(
        public titulo: string,
        public sueldo: RangoSueldo,
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
        public id?: number,
    ) {
    }
}
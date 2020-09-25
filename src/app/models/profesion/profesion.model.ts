import { Administrador } from '../administrador/administrador.model';
import { AreaLaboral } from './area-laboral.model';
import { ActividadLaboral } from './actividad-laboral.model';
export class Profesion {
    constructor(
        public nombre: string,
        public habilitado: boolean,
        public area_laboral: AreaLaboral,
        public administrador: Administrador,
        public actividad_laboral: ActividadLaboral,
        public id?: number,
    ) {
    }
}
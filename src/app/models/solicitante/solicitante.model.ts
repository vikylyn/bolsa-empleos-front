import { Credenciales } from '../credenciales.model';
import { Imagen } from '../imagen.model';
import { EstadoCivil } from '../estado-civil.model';
import { Ciudad } from '../ciudad.model';
import { Profesion } from '../profesion/profesion.model';
export class Solicitante {
    constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public cedula: string,
        public genero: string,
        public credenciales: Credenciales,
        public nacionalidad: string,
        public direccion: string,
        public estado_civil: EstadoCivil,
        public ciudad: Ciudad,
        public fecha_nac: Date,
        public profesion: Profesion,
        public id?: number,
        public imagen?: Imagen,
        public habilitado?: boolean,
        public creado_en?: Date,
        public ocupado?: boolean,
    ){
    }
}

import { Credenciales } from '../credenciales.model';
import { Imagen } from '../imagen.model';
import { Ciudad } from '../ciudad.model';
import { Vacante } from './vacante.model';
export class Empleador {
    constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public cedula: string,
        public genero: string,
        public habilitado: boolean,
        public credenciales: Credenciales,
        public imagen: Imagen,
        public nacionalidad: string,
        public direccion: string,
        public empresa: boolean,
        public creado_en: Date,
        public ciudad: Ciudad,
        public vacante?: Vacante[],
        public id?: number,

    ){}
}


import { Credenciales } from '../credenciales.model';
import { Imagen } from '../imagen.model';
import { Ciudad } from '../ciudad.model';
export class Administrador {
    constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public cedula: string,
        public num_complemento_ci: string,
        public genero: string,
        public habilitado: boolean,
        public creado_en: Date,
        public modificado_en: Date,
        public ciudad: Ciudad,
        public direccion: string,
        public credenciales?: Credenciales,
        public imagen?: Imagen,
        public id?: number,
    ) {}
}
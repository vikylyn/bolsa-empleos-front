

import { Credenciales } from '../credenciales.model';
import { Imagen } from '../imagen.model';
export class Administrador {
    constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public cedula: string,
        public genero: string,
        public habilitado: boolean,
        public credenciales?: Credenciales,
        public imagen?: Imagen,
        public id?: number,
    ) {}
}
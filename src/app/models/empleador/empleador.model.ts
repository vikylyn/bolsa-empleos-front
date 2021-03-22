import { Credenciales } from '../credenciales.model';
import { Imagen } from '../imagen.model';
import { Ciudad } from '../ciudad.model';
import { Vacante } from './vacante.model';
import { Empresa } from './empresa.model';
export class Empleador {
    constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public cedula: string,
        public num_complemento_ci: string,
        public genero: string,
        public habilitado: boolean,
        public credenciales: Credenciales,
        public imagen: Imagen,
        public nacionalidad: string,
        public direccion: string,
        public creado_en: Date,
        public ciudad: Ciudad,
        public existe_empresa: boolean,
        public vacante?: Vacante[],
        public empresa?: Empresa,
        public id?: number
    ){}
}

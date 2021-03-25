import { Imagen } from '../imagen.model';
import { Empleador } from './empleador.model';
import { Ciudad } from '../ciudad.model';
import { RazonSocial } from './razon-social.model';
export class Empresa {

    constructor(
        public nombre: string,
        public dominio_web: string,
        public direccion: string,
        public telefono: string,
        public descripcion: string,
        public logo: Imagen,
        public creado_en: Date,
        public empleador: Empleador,
        public ciudad: Ciudad,
        public razon_social: RazonSocial,
        public id?: number
    ) {

    }
}

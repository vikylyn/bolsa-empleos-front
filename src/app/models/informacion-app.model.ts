import { Imagen } from './imagen.model';
import { Ciudad } from './ciudad.model';
export class InformacionApp {
    constructor(
        public nombre: string,
        public eslogan: string,
        public descripcion: string,
        public telefono: string,
        public email: string,
        public imagen: Imagen,
        public direccion: string,
        public ciudad: Ciudad,
        public creado_en: Date,
        public modificado_en: Date,
        public id?: number
    ){
    }
}
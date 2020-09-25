export class Imagen {
    constructor(
        public id_cloudinary: string,
        public formato: string,
        public url: string,
        public url_segura: string,
        public id?: number,
    ){ 
    }
}
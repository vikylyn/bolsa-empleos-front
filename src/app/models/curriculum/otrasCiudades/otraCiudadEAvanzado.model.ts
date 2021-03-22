import { EstudioAvanzado } from '../estudio-avanzado.model';
export class OtraCiudadEAvanzado {
    constructor(
       public pais: string,
       public estado: string,
       public ciudad: string,
       public estudio: EstudioAvanzado,
       public id?: number
    ){}
}

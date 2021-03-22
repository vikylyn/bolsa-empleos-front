import { EstudioBasico } from '../estudio-basico.model';
export class OtraCiudadEBasico {
    constructor(
       public pais: string,
       public estado: string,
       public ciudad: string,
       public estudio: EstudioBasico,
       public id?: number
    ){}
}

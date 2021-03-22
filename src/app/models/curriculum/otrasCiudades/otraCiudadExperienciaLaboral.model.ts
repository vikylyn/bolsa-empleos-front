import { ExperienciaLaboral } from '../experiencia-laboral.model';

export class OtraCiudadExperienciaLaboral {
    constructor(
       public pais: string,
       public estado: string,
       public ciudad: string,
       public experiencia: ExperienciaLaboral,
       public id?: number
    ){}
}

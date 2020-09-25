import { Habilidad } from './habilidad.model';
import { EstudioBasico } from './estudio-basico.model';
import { EstudioAvanzado } from './estudio-avanzado.model';
import { Referencia } from './referencia.model';
import { CurriculumIdioma } from './curriculum-idioma.model';
import { CurriculumHabilidad } from './curriculum-habilidad.model';
import { Solicitante } from '../solicitante/solicitante.model';
import { ExperienciaLaboral } from './experiencia-laboral.model';
export class Curriculum {
    constructor(
        public titulo: string,
        public pretension_salarial: number,
        public biografia: string,
        public creado_en: Date,
        public solicitante: Solicitante,
        public id?: number,
        public experiencias_laborales?: ExperienciaLaboral[],
        public curriculum_habilidades?: CurriculumHabilidad[],
        public estudios_basicos?: EstudioBasico[],
        public estudios_avanzados?: EstudioAvanzado[],
        public referencias?: Referencia[],
        public curriculum_idiomas?: CurriculumIdioma[],
    ) {}
}

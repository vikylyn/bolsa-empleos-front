import { NivelEscolar } from './nivel-escolar.model';
export class GradoEscolar {
    constructor(
        public grado: string,
        public nivel_escolar: NivelEscolar,
        public id?: number
    ) {}
}

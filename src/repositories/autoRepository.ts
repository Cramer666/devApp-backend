import { Auto } from '../models/auto';
import { generalRepository } from './generalRepository';

export class AutoRepository extends generalRepository<Auto> {
    findByPatente(patente: string): Auto | undefined {
        return this.data.find((a) => a.patente === patente);
    }

    findByDuenio(duenioId: string): Auto[] {
        return this.data.filter((a) => a.duenioId === duenioId);
    }
    //Segun el enunciado este tiene q ser particular para cada entidad.
    browse() {
        return this.data.map(({ id, marca, modelo, patente }) => ({ id, marca, modelo, patente }));
    }
}

import { Auto } from '../models/auto';
//import { breadService } from '../services/breadService';
import { generalRepository } from './generalRepository';

export class AutoRepository extends generalRepository<Auto> {
    findByPatente(patente: string): Auto | undefined {
        return this.data.find((a) => a.patente === patente);
    }

    findByDuenio(dueñoId: string): Auto[] {
        return this.data.filter((a) => a.duenioId === dueñoId);
    }
    //Segun el enunciado este debe ser particular para cada entidad.
    browse() {
        return this.data.map(({ id, marca, modelo, patente }) => ({ id, marca, modelo, patente }));
    }
}

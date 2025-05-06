import { AutoRepository } from '../repositories/autoRepository';
import { Auto } from '../models/auto';
import { PersonaRepository } from '../repositories/personaRepository';

export class AutoService {
    private repository = new AutoRepository();
    private personaRepo = new PersonaRepository();

    getAll() {
        const autos = this.repository.getAll();

        return autos.map((auto) => {
            const persona = this.personaRepo.getById(auto.duenioId);
            return {
                ...auto,
                duenio: persona ? `${persona.nombre} ${persona.apellido}` : 'Sin dueño',
            };
        });
    }

    getById(id: string) {
        return this.repository.getById(id);
    }

    create(auto: Omit<Auto, 'id'>) {
        return this.repository.create(auto);
    }

    update(id: string, updates: Partial<Auto>) {
        return this.repository.update(id, updates);
    }

    delete(id: string) {
        return this.repository.delete(id);
    }

    findByPatente(patente: string) {
        return this.repository.findByPatente(patente);
    }

    findByDueño(dueñoId: string) {
        return this.repository.findByDuenio(dueñoId);
    }

    browse() {
        return this.repository.browse();
    }
}

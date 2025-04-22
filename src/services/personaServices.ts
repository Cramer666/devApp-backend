import { PersonaRepository } from '../repositories/personaRepository';
import { Persona } from '../models/persona';

export class PersonaService {
    constructor(private repository: PersonaRepository) {}

    getAll() {
        return this.repository.getAll();
    }

    getById(id: string) {
        return this.repository.getById(id);
    }

    create(persona: Omit<Persona, 'id'>) {
        return this.repository.create(persona);
    }

    update(id: string, updates: Partial<Persona>) {
        return this.repository.update(id, updates);
    }

    delete(id: string) {
        return this.repository.delete(id);
    }

    browse() {
        return this.repository.browse();
    }
}

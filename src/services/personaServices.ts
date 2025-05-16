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

    getNombreApellidoById(id: string): { nombre: string; apellido: string } | undefined {
        const persona = this.repository.getById(id);
        if (!persona) return undefined;
        return {
            nombre: persona.nombre,
            apellido: persona.apellido,
        };
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

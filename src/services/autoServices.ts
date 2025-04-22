import { AutoRepository } from '../repositories/autoRepository';
import { Auto } from '../models/auto';

export class AutoService {
    private repository = new AutoRepository();

    getAll() {
        return this.repository.getAll();
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

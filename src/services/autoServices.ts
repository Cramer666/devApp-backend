import { Auto } from '../models/auto';
import { AutoRepository } from '../repositories/autoRepository';
import { PersonaRepository } from '../repositories/personaRepository';

export class AutoService {
    constructor(
        private autoRepo: AutoRepository,
        private personaRepo: PersonaRepository,
    ) {}

    getAll() {
        return this.autoRepo.getAll();
    }

    getById(id: string) {
        return this.autoRepo.getById(id);
    }

    getAllWithOwnerNames() {
        const autos = this.autoRepo.getAll();
        return autos.map((auto) => {
            if (!auto.duenioId) {
                return {
                    ...auto,
                    nombreDuenio: 'Sin dueño',
                    apellidoDuenio: '',
                };
            }

            const duenio = this.personaRepo.getById(auto.duenioId);
            return {
                ...auto,
                nombreDuenio: duenio?.nombre || 'Desconocido',
                apellidoDuenio: duenio?.apellido || '',
            };
        });
    }

    create(auto: Omit<Auto, 'id'>) {
        return this.autoRepo.create(auto);
    }

    update(id: string, updates: Partial<Auto>) {
        return this.autoRepo.update(id, updates);
    }

    delete(id: string) {
        return this.autoRepo.delete(id);
    }

    findByPatente(patente: string) {
        return this.autoRepo.findByPatente(patente);
    }

    findByDueño(dueñoId: string) {
        return this.autoRepo.findByDuenio(dueñoId);
    }

    browse() {
        return this.autoRepo.browse();
    }
}

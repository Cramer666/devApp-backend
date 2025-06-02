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

    create(autoData: Omit<Auto, 'id'>) {
        if (!autoData.patente || !autoData.nroDeChasis) {
            throw new Error('Patente y número de chasis son obligatorios');
        }

        const autos = this.autoRepo.getAll();
        const patenteExiste = autos.some((a) => a.patente === autoData.patente);
        if (patenteExiste) throw new Error('La patente ya esta registrada');

        const chasisExiste = autos.some((a) => a.nroDeChasis === autoData.nroDeChasis);
        if (chasisExiste) throw new Error('El numero de chasis ya existe');

        const nuevoAuto = this.autoRepo.create(autoData);

        if ('error' in nuevoAuto) {
            throw new Error(nuevoAuto.error);
        }

        if (nuevoAuto.duenioId) {
            const persona = this.personaRepo.getById(nuevoAuto.duenioId);
            if (persona) {
                persona.vehiculo.push(nuevoAuto);
            }
        }

        return nuevoAuto;
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

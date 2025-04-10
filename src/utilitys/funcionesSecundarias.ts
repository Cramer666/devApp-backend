import { Persona } from '../models/persona';
import { personas } from '../repositories/lista';

export const dataBasic = () => {
    return personas.map((persona) => ({
        DNI: persona.DNI,
        nombre: persona.nombre,
        apellido: persona.apellido,
    }));
};

export const dataFull = (persona: Partial<Persona>): boolean => {
    return (
        typeof persona.nombre === 'string' ||
        typeof persona.apellido === 'string' ||
        typeof persona.DNI === 'string' ||
        typeof persona.fechaDeNacimiento === 'string' ||
        typeof persona.genero === 'string' ||
        typeof persona.donante === 'boolean'
    );
};

export const validarPersona = (persona: Partial<Persona>): boolean => {
    return (
        typeof persona.nombre === 'string' &&
        typeof persona.apellido === 'string' &&
        typeof persona.DNI === 'string' &&
        typeof persona.fechaDeNacimiento === 'string' &&
        typeof persona.genero === 'string' &&
        typeof persona.donante === 'boolean'
    );
};

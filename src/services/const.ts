import { personas } from '../repositories/lista';
import { Persona } from '../models/persona';

export const findPersonaById = (id: number) => {
    return personas.find((p) => p.id === id);
};

export const dataBasic = () => {
    return personas.map((persona) => ({
        DNI: persona.DNI,
        nombre: persona.nombre,
        apellido: persona.apellido,
    }));
};

const dataFull = (persona: Partial<Persona>): boolean => {
    return (
        typeof persona.nombre === 'string' ||
        typeof persona.apellido === 'string' ||
        typeof persona.DNI === 'string' ||
        typeof persona.fechaDeNacimiento === 'string' ||
        typeof persona.genero === 'string' ||
        typeof persona.donante === 'boolean'
    );
};
/*SE PUEDE IR A FREIR CHURROS EL PUT Y LA PTMQLP!*/
 export const editById = (id: number, datosNuevos: Partial<Persona>) => {
    const personaID = findPersonaById(id);
    const personaActualizada = personaID;

    if (!personaID) {
        return null;
    } else if (!dataFull(datosNuevos)) {
        return false;
    }
    Object.assign(personaID, datosNuevos);

    return personaActualizada;
};


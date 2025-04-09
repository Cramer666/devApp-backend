import { asignarID, personas } from '../repositories/lista';
import { Persona } from '../models/persona';




export const crearPersona = (persona: Partial<Persona>): Persona => {
    //el ! no es lo mas seguro pero ña, tendria q validar
    return {
        id: asignarID(),
        nombre: persona.nombre!,
        apellido: persona.apellido!,
        DNI: persona.DNI!,
        fechaDeNacimiento: persona.fechaDeNacimiento!,
        genero: persona.genero!,
        donante: persona.donante!,
        vehiculo: persona.vehiculo!
    };
};

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

const validarPersona = (persona: Partial<Persona>): boolean => {
    return (
        typeof persona.nombre === 'string' &&
        typeof persona.apellido === 'string' &&
        typeof persona.DNI === 'string' &&
        typeof persona.fechaDeNacimiento === 'string' &&
        typeof persona.genero === 'string' &&
        typeof persona.donante === 'boolean'
    );
};

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

export const addEntity =(entidad : any) => {

    if (!validarPersona(entidad)) throw new Error();

    const nuevaPersona = crearPersona(entidad);
    personas.push(nuevaPersona);
    return nuevaPersona.id;
}


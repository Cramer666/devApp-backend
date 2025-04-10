import { asignarID, personas } from '../repositories/lista';
import { Persona } from '../models/persona';
import { dataFull, validarPersona } from '../utilitys/funcionesSecundarias';

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
        vehiculo: persona.vehiculo!,
    };
};

export const getAllPersonas = () => {
    return personas;
};

export const findPersonaById = (id: number) => {
    return personas.find((p) => p.id === id);
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

export const addEntity = (entidad: Partial<Persona>) => {
    if (!validarPersona(entidad)) throw new Error();

    const nuevaPersona = crearPersona(entidad);
    personas.push(nuevaPersona);
    return nuevaPersona.id;
};

const findIndexById = (id: number) => {
    return personas.findIndex((p) => p.id === id);
};

export const deleteByID = (id: number): boolean => {
    const personaID = findIndexById(id); //si no da esta ponele es -1
    if (personaID === -1) {
        return false;
    }
    personas.splice(personaID);
    return true;
};

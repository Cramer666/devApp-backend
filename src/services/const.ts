import { personas } from '../interfaces/lista';

export const findPersonaById = (id: number): unknown => {
    return personas.find((p) => p.id === id);
};

export const dataBasic = () => {
    personas.map((persona) => ({
        DNI: persona.DNI,
        nombre: persona.nombre,
        apellido: persona.apellido,
    }));
};

//export const editById = (id: number) => {};

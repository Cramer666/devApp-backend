import { personas } from '../interfaces/lista';
import { Persona } from '../interfaces/persona';

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
/*SE PUEDE IR A FREIR CHURROS EL PUT Y LA PTMQLP!*/
export const editById = (id: number, datosNuevos: Partial<Persona>) => {
    const persona = findPersonaById(id);
    const camposValidos = [persona?.nombre];
    if (!persona) {
        return null;
    }
    for (const campo in datosNuevos) {
        if (!camposValidos.includes(campo)) {
            return 'Error: Hay campos inválidos en la solicitud';
        }
    }
    Object.assign(persona, datosNuevos);
    return persona;
};

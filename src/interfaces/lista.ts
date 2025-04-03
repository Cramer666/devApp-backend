import { Persona } from './persona';
import { Genero } from './genero';

const lucia: Persona = {
    id: 1,
    nombre: 'Lucia',
    apellido: 'Perrone',
    DNI: '35.219.427',
    fechaDeNacimiento: new Date('1990-06-13'),
    genero: Genero.Femenino,
    donante: true,
    vehiculo: [],
};

const ezequiel: Persona = {
    id: 2,
    nombre: 'Ezequiel',
    apellido: 'Rumiano',
    DNI: 'null',
    fechaDeNacimiento: new Date('2002-02-02'),
    genero: Genero.Masculino,
    donante: true,
    vehiculo: [],
};

export const personas: Persona[] = [lucia, ezequiel];

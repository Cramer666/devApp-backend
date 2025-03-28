import { Persona } from './persona';
import { Genero } from './genero';

const lucia: Persona = {
    nombre: 'Lucia',
    apellido: 'Perrone',
    DNI: '35.219.427',
    fechaDeNacimiento: new Date('1990-06-13'),
    genero: Genero.Femenino,
    donante: true,
    vehiculo: [],
};

const personas: Persona[] = [lucia];

export default { personas };

import { Auto } from './auto';
import { Genero } from './genero';

export interface Persona {
    nombre: string;
    apellido: string;
    DNI: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    donante: boolean;
    vehiculo: Auto[];
}

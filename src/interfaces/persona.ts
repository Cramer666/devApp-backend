import { Auto } from './auto';
import { Genero } from './genero';

export interface Persona {
    /*Si le pones un ? es optativo el campo */
    /*Leer sobre tipos de typescript*/
    id: number;
    nombre: string;
    apellido: string;
    DNI: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    donante: boolean;
    vehiculo: Auto[];
}

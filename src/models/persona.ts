import { index } from '.';
import { Auto } from '../models/auto';

type Genero = 'Masculino' | 'Femenino' | 'No binario';

export interface Persona extends index {
    patente: string;
    nroDeChasis: string;
    /*Si le pones un ? es optativo el campo */
    /*Leer sobre tipos de typescript*/
    nombre: string;
    apellido: string;
    DNI: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    donante: boolean;
    vehiculo: Auto[];
}

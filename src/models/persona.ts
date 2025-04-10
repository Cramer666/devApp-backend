import { Auto } from '../models/auto';

type Genero = 'Maculino' | 'Femenino' | 'No binario';

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

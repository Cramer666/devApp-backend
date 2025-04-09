import { Persona } from '../models/persona';

export interface Auto {
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    nroDeChasis: string;
    motor: string;
    duenio: Persona['id'];
}

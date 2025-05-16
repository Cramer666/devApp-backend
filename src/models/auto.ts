import { index } from '.';

export interface Auto extends index {
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    nroDeChasis: string;
    motor: string;
    duenioId: string | null;
}

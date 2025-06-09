import { Auto, AutoModel } from "../models";

export interface AutoDto {
    id: string;
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    nroDeChasis: string;
    motor: string;
    duenioId: string | null;
}

export interface AutoCreadoDTO {
  marca: string;
  modelo: string;
  anio: number;
  patente: string;
  color: string;
  nroChasis: string;
  nroMotor: string;
  dueñoId: string;
}

export interface AutoActualizadoDTO {
  marca?: string;
  modelo?: string;
  anio?: number;
  patente?: string;
  color?: string;
  nroChasis?: string;
  nroMotor?: string;
}

export function pasarADto(auto: Auto): AutoDto {
    const autoDto:AutoDto={
        id:auto._id,
        marca:auto.marca,
        modelo:auto.modelo,
        anio:auto.anio,
        patente:auto.patente,
        color:auto.color,
        nroDeChasis:auto.nroDeChasis,
        motor:auto.motor,
        duenioId:auto.duenioId
    }
    return autoDto;
}


export function pasarAModelo(autoDto: AutoDto) {
    return new AutoModel ({
        _id: autoDto.id,
        marca: autoDto.marca,
        modelo: autoDto.modelo,
        anio: autoDto.anio,
        patente: autoDto.patente,
        color: autoDto.color,
        nroDeChasis: autoDto.nroDeChasis,
        motor: autoDto.motor,
        duenioId: autoDto.duenioId
    });
}


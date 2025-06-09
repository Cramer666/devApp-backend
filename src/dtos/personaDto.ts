import { Persona, PersonaModel } from "../models";
import { Genero } from "../models/generoEnum";

export interface PersonaDto {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  donante?: boolean;
  genero?: Genero;
  vehiculo?: {
    marca: string;
    modelo: string;
    patente: string;
  }[];
}

export function pasarADto(persona: Persona): PersonaDto{
  const personaDto: PersonaDto={
    id:persona._id,
    nombre:persona.nombre,
    apellido:persona.apellido,
    dni:persona.dni,
    fechaNacimiento: persona.fechaNacimiento,
    donante:persona.donante,
    genero:persona.genero,
    vehiculo:persona.vehiculo,
  }
  return personaDto;
}

export function pasarAModelo(personaDto: PersonaDto){
  return new PersonaModel({
    _id: personaDto.id,
    nombre:personaDto.nombre,
    apellido:personaDto.apellido,
    dni:personaDto.dni,
    donante:personaDto.donante,
    genero:personaDto.genero,
    vehiculo:personaDto.vehiculo,
})
}

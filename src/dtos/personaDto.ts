import { Persona, PersonaModel } from "../models/persona";
import { Genero } from "../models/generoEnum";
/*Crei q eran optativos o poco importantes pero resulta q fueron necesarios,
no extrictamente pero por seguridad tamb...*/
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

export function pasarADto(persona: any): PersonaDto{
  const personaDto: PersonaDto={
    id: persona._id?.toString(),
    nombre:persona.nombre,
    apellido:persona.apellido,
    dni:persona.dni,
    fechaNacimiento: new Date(persona.fechaNacimiento),
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

import { AutoModel } from "../models/auto";
import { PersonaModel } from "../models/persona";
import { crearServicioGenerico } from "../utils/generadorServicio";

export const browse = async () => {
  return PersonaModel.find().select("dni nombre apellido");
};
export const servicioPersona = crearServicioGenerico(PersonaModel, {browse});
export const listarAutosPorPersona = async (personaId: string) => {
    return await AutoModel.find({ duenioId: personaId }).select('marca modelo anio patente');
  }

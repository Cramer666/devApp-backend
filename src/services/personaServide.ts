import { AutoModel } from "../models/auto";
import { PersonaModel } from "../models/persona";
import { crearServicioGenerico } from "../utils/generadorServicio";


export const servicioPersona = crearServicioGenerico(PersonaModel);

export const listarAutosPorPersona = async (personaId: string) => {
    return await AutoModel.find({ duenioId: personaId }).select('marca modelo anio patente');
  }

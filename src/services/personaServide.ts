import { AutoModel } from "../models/auto";
import { Persona, PersonaModel } from "../models/persona";
import { InMemoryRepository } from "../repositories/memoriaRepo";
import { MongoRepository } from "../repositories/mongoRepo";
import { IRepository } from "../repositories/repoGenerico";
import { crearServicioGenerico } from "../utils/generadorServicio";
import dotenv from "dotenv";


dotenv.config();

const useMongo = process.env.STORAGE === "mongo";

export const personaRepository: IRepository<Persona> = useMongo
  ? new MongoRepository<Persona>(PersonaModel)
  : new InMemoryRepository<Persona>();

/*export const browse = async () => {
  return PersonaModel.find().select("dni nombre apellido");
};*/
export const servicioPersona = crearServicioGenerico(personaRepository);
/*export const listarAutosPorPersona = async (personaId: string) => {
    return await AutoModel.find({ duenioId: personaId }).select('marca modelo anio patente');
  }*/
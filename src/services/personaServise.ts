import { AutoModel } from "../models/auto";
import { Persona, PersonaModel } from "../models/persona";
import { InMemoryRepository } from "../repositories/memoriaRepo";
import { MongoRepository } from "../repositories/mongoRepo";
import { IRepository } from "../repositories/interfaceRepo";
import { ServicioGenerico} from "../services/servicioGenerico";
import dotenv from "dotenv";

dotenv.config();
const useMongo = process.env.STORAGE === "mongo";

export const personaRepository: IRepository<Persona> = useMongo
  ? new MongoRepository<Persona>(PersonaModel)
  : new InMemoryRepository<Persona>();

export const browse = async () => {
  return PersonaModel.find().select("dni nombre apellido");
};

export const servicioPersona = new ServicioGenerico(personaRepository);
export const listarAutosPorPersona = async (personaId: string) => {
    return await AutoModel.find({ duenioId: personaId }).select('marca modelo anio patente');
}


export class PersonaService extends ServicioGenerico<Persona>{
  constructor(repo: IRepository<Persona>){
    super(repo);
  }
//escribir los metodos especificos desp

}
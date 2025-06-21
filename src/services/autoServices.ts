
import { IRepository } from "../repositories/interfaceRepo";
import { InMemoryRepository } from "../repositories/memoriaRepo";
import { MongoRepository } from "../repositories/mongoRepo";
import { Auto } from "../models/auto";
import { AutoModel } from "../models/auto";
import { personaRepository } from "./personaServise";
import dotenv from "dotenv";
import { ServicioGenerico } from "../services/servicioGenerico";

dotenv.config();
const useMongo = process.env.STORAGE === "mongo";


export const autoRepository: IRepository<Auto> = useMongo
  ? new MongoRepository<Auto>(AutoModel)
  : new InMemoryRepository<Auto>();


export const browse = async () => {
  const autos = await autoRepository.getAll();
  return autos.map(({ marca, modelo, anio, patente }) => ({
    marca,
    modelo,
    anio,
    patente
  }));
};

export const servicioAuto = new ServicioGenerico(autoRepository);

export const listarDuenos = async () => {
  const autos = await autoRepository.getAll();
  const personas = await personaRepository.getAll();

  return autos.map(auto => {
    const duenio = personas.find(p => p.id === auto.duenioId) || null;
    return {
      id: auto.id,
      marca: auto.marca,
      modelo: auto.modelo,
      duenio: duenio
        ? { nombre: duenio.nombre, apellido: duenio.apellido }
        : null
    };
  });
};

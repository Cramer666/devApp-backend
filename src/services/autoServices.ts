
import { IRepository } from "../repositories/repoGenerico";
import { InMemoryRepository } from "../repositories/memoriaRepo";
import { MongoRepository } from "../repositories/mongoRepo";
import { Auto } from "../models/auto";
import { AutoModel } from "../models/auto";
import { personaRepository } from "./personaServide";
import dotenv from "dotenv";
import { crearServicioGenerico } from "../utils/generadorServicio";

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

export const servicioAuto = crearServicioGenerico(autoRepository, {
  browse
});

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

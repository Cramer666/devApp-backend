import { MongoRepository } from "./mongoRepo";
import { InMemoryRepository } from "./memoriaRepo";
import { FirebaseRepository } from "./firebaseRepo";
import { IRepository } from "./interfaceRepo";
import { Model } from "mongoose";
import { config } from "dotenv";

config(); // Carga variables de entorno del archivo .env

const STORAGE = process.env.STORAGE?.toLowerCase() || "memoria";

export function obtenerRepositorio<T extends { id?: string }>(
  firebaseNombre: string,
  modeloMongo?: Model<T>
): IRepository<T> {
  switch (STORAGE) {
    case "mongo":
      if (!modeloMongo) throw new Error("Falta modelo Mongo para este storage");
      return new MongoRepository<T>(modeloMongo);

    case "firebase":
      return new FirebaseRepository<T>(firebaseNombre);

    case "memoria":
    default:
      return new InMemoryRepository<T>();
  }
}

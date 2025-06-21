import { Request, Response } from "express";
import { Persona, PersonaModel } from "../models/persona";
import { crearControladorGenerico } from "./entityController";
import { validarCamposRequeridos } from "../middlewares/validaciones";
import { AutoModel } from "../models/auto";
import { PersonaService } from "../services/personaServise";
import { InMemoryRepository } from "../repositories/memoriaRepo";
import { MongoRepository } from "../repositories/mongoRepo";


const repoPersona = process.env.STORAGE === "memoria"
  ? new InMemoryRepository<Persona>()
  : new MongoRepository<Persona>(PersonaModel);


const servicioPersona = new PersonaService(repoPersona);

const controladorBase = crearControladorGenerico(servicioPersona, {
  validacionesPost: [
    validarCamposRequeridos([
      "nombre",
      "apellido",
      "dni",
      "fechaNacimiento",
      "donante",
      "genero"
    ]),
  ]
});

const listarAutos = async (req: Request, res: Response) => {
  if (process.env.STORAGE === "memoria") {
    return res.status(400).json({ error: "Esta función no está disponible en modo memoria" });
  }

  try {
    const personaId = req.params.id;
    const autos = await AutoModel.find({ duenioId: personaId });
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar autos de la persona" });
  }
};

export const controladorPersona = {
  ...controladorBase,
  listarAutos,
};
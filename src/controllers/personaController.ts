import { Request, Response } from "express";
import { crearControladorGenerico } from "./entityController";
import { validarCamposRequeridos } from "../middlewares/validaciones";
import { Persona } from "../models/persona";
import { Auto } from "../models/auto";
import { obtenerRepositorio } from "../repos/factoryRepo";
import { PersonaModel } from "../models/persona";
import { AutoModel } from "../models/auto";
import { PersonaService } from "../services/personaServices";

// Obtener repositorios desde fábrica según .env
const repoPersona = obtenerRepositorio<Persona>("personas", PersonaModel);
const repoAuto = obtenerRepositorio<Auto>("autos", AutoModel);

// Crear servicio con los dos repositorios necesarios
const servicioPersona = new PersonaService(repoPersona, repoAuto);

// Crear controlador genérico con validaciones
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

// Metodo propio
const listarAutos = async (req: Request, res: Response) => {
  try {
    const personaId = req.params.id;
    const autos = await servicioPersona.listarAutosPorPersona(personaId);
    res.json(autos);
  } catch (error) {
    console.error("Error al listar autos:", error);
    res.status(500).json({ error: "Error al listar autos de la persona" });
  }
};


export const controladorPersona = {
  ...controladorBase,
  listarAutos,
};

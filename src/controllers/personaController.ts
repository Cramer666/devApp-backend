import { Request, Response } from "express";
import { PersonaModel } from "../models/persona";
import { crearServicioGenerico } from "../utils/generadorServicio";
import { crearControladorGenerico } from "./entityController";
import { validarCamposRequeridos } from "../middlewares/validaciones";
import { pasarADto as personaPasarADto, pasarAModelo as personaPasarAModelo } from "../dtos/personaDto";
import { AutoModel } from "../models/auto";

// Selecciona el modelo basado en STORAGE
const modelo = process.env.STORAGE === "memoria" ? null : PersonaModel;

const servicioPersona = crearServicioGenerico(modelo, {
  pasarADto: personaPasarADto,
  pasarAModelo: personaPasarAModelo
});

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

// solo funciona con mongo x ahora
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
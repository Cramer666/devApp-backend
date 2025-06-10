import { Request, Response } from "express";
import { servicioPersona, listarAutosPorPersona } from "../services/personaServide";
import { crearControladorGenerico } from "./entityController";
import { validarCamposRequeridos } from "../middlewares/validaciones";

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

// Mtodo propio para listar autos de una persona...
const listarAutos = async (req: Request, res: Response) => {
  try {
    const personaId = req.params.id;
    const autos = await listarAutosPorPersona(personaId);
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar autos de la persona" });
  }
};

export const controladorPersona = {
  ...controladorBase,
  listarAutos,
};

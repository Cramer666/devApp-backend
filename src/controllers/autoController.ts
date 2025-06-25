import { Request, Response } from "express";
import { Auto } from "../models/auto";
import { Persona } from "../models/persona";
import { AutoModel } from "../models/auto";
import {PersonaModel } from "../models/persona"
import { pasarADto, pasarAModelo } from "../dtos/autoDto";
import { validarCamposRequeridos, validarFormatoPatente } from "../middlewares/validaciones";
import { crearControladorGenerico } from "./entityController";
import { obtenerRepositorio } from "../repos/factoryRepo";
import { AutoService } from "../services/autoServices";

// Repos segun tipo de almacenamiento (.env)
const repoAuto = obtenerRepositorio<Auto>("autos", AutoModel);
const repoPersona = obtenerRepositorio<Persona>("personas", PersonaModel);

// Servicio especifico
const servicioAuto = new AutoService(repoAuto, repoPersona);

// Controlador generico
const controladorGenerico = crearControladorGenerico(servicioAuto, {
  validacionesPost: [
    validarCamposRequeridos([
      "marca",
      "modelo",
      "anio",
      "patente",
      "color",
      "nroDeChasis",
      "motor",
      "duenioId"
    ]),
    validarFormatoPatente("patente")
  ],
  pasarADto,
  pasarAModelo
})

export const controladorAuto = {
  ...controladorGenerico,

  // Metodo propio
  listarDuenios: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const resultado = await servicioAuto.listarDuenios(id);
      res.json(resultado);
    } catch (error) {
      console.error("Error al listar dueño del auto:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
};

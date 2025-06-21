import { AutoModel } from "../models/auto";
import { ServicioGenerico } from "../services/servicioGenerico";
import { pasarADto, pasarAModelo } from "../dtos/autoDto";
import { crearControladorGenerico } from "./entityController";
import { validarCamposRequeridos, validarFormatoPatente } from "../middlewares/validaciones";
import { Request, Response } from "express";
import { MongoRepository } from "../repositories/mongoRepo";
import { InMemoryRepository } from "../repositories/memoriaRepo";
import { Auto } from "../models/auto";


const repoAuto = process.env.STORAGE === "memoria"
  ? new InMemoryRepository<Auto>()
  : new MongoRepository<Auto>(AutoModel);


const servicioAuto = new ServicioGenerico<Auto>(repoAuto);

export const controladorAuto = crearControladorGenerico(servicioAuto, {
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
});

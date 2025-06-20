import { AutoModel } from "../models/auto";
import { crearServicioGenerico } from "../utils/generadorServicio";
import { pasarADto, pasarAModelo } from "../dtos/autoDto";
import { crearControladorGenerico } from "./entityController";
import { validarCamposRequeridos, validarFormatoPatente } from "../middlewares/validaciones";
import { Request, Response } from "express";

// Selecciona el modelo basado en STORAGE
const modelo = process.env.STORAGE === "memoria" ? null : AutoModel;

const servicioAuto = crearServicioGenerico(modelo, {
  pasarADto,
  pasarAModelo
});

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
  ]
});

// solo funciona con mongo x ahora
const listarDuenos = async (req: Request, res: Response) => {
  if (process.env.STORAGE === "memoria") {
    return res.status(400).json({ error: "Esta función no está disponible en modo memoria" });
  }

  try {
    const autosConDuenios = await AutoModel.find()
      .populate('duenioId', 'nombre apellido');

    const resultado = autosConDuenios.map(auto => ({
      _id: auto._id,
      marca: auto.marca,
      modelo: auto.modelo,
      duenio: auto.duenioId ? {
        nombre: (auto.duenioId as any).nombre,
        apellido: (auto.duenioId as any).apellido
      } : null
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar dueños" });
  }
};

export const controladorAutoConExtras = {
  ...controladorAuto,
  listarDuenos
};
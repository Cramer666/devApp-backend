import { AutoModel } from "../models/auto";
import { crearServicioGenerico } from "../utils/generadorServicio";

export const servicioAuto = crearServicioGenerico(AutoModel);

export const listarDuenos = async () => {
  const autosConDuenios = await AutoModel.find()
    .populate('duenioId', 'nombre apellido');

  return autosConDuenios.map(auto => ({
    _id: auto._id,
    marca: auto.marca,
    modelo: auto.modelo,
    duenio: auto.duenioId ? {
      nombre: (auto.duenioId as any).nombre,
      apellido: (auto.duenioId as any).apellido
    } : null
  }));
};

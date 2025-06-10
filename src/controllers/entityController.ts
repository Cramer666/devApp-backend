import { Request, Response } from "express";
import { ServicioGenerico } from "../types/interfaces";

export function crearControladorGenerico(
  servicio: ServicioGenerico,
  opciones?: {
    validacionesPost?: any[]
  }
) {
  const getAll = async (req: Request, res: Response) => {
    const data = await servicio.getAll();
    res.json(data);
  };

  const getById = async (req: Request, res: Response) => {
    const data = await servicio.getById(req.params.id);
    res.json(data);
  };

  const add = async (req: Request, res: Response) => {
    const nuevo = await servicio.add(req.body);
    res.status(201).json(nuevo);
  };

  const remove = async (req: Request, res: Response) => {
    await servicio.remove(req.params.id);
    res.status(204).end();
  };


  const update = async (req: Request, res: Response) => {
    try {
      const actualizado = await servicio.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar" });
    }
  };

  return {
    getAll,
    getById,
    add,
    remove,
    update,
    validacionesPost: opciones?.validacionesPost || []
  };
}

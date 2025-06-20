import { Request, Response } from "express";
import { ServicioGenerico } from "../services/serviceGenerico";

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

  const browse = async (req: Request, res: Response) => {
    try {
      const data = await servicio.browse?.(req.query);
      res.status(200).json(data);
    } catch (e: any) {
       console.error("Error en browse:", Error);
      res.status(500).json({ error: e.message });
    }
  };

  const getById = async (req: Request, res: Response) => {
    const data = await servicio.getById(req.params.id);
    res.json(data);
  };

  const create = async (req: Request, res: Response) => {
    const nuevo = await servicio.create(req.body);
    res.status(201).json(nuevo);
  };

  const remove = async (req: Request, res: Response) => {
    await servicio.create(req.params.id);
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
    browse,
    create,
    remove,
    update,
    validacionesPost: opciones?.validacionesPost || []
  };
}

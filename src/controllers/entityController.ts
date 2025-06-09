import { Request, Response } from "express";
import mongoose from "mongoose";

export class ControllerGenerico<T, S extends {
  getAll(query: any): Promise<T[]>,
  getById(id: string): Promise<T | null>,
  create(data: Partial<T>): Promise<T>,
  update(id: string, data: any): Promise<T | null>,
  delete(id: string): Promise<T | null>
}> {
  protected service: S;

  constructor(service: S) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const data = await this.service.getAll(query);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error obteniendo datos" });
    }
  };

 getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("ID recibido:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ mensaje: "ID inválido" });
    }
    const data = await this.service.getById(id);
    if (!data) {
      res.status(404).json({ mensaje: "No encontrado" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo por ID" });
  }
};


  create = async (req: Request, res: Response) => {
    try {
      const newEntity = await this.service.create(req.body);
      res.status(201).json(newEntity);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creando entidad" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deleted = await this.service.delete(id);
      if (!deleted) {
        res.status(404).json({ mensaje: "No encontrado para borrar" });
      }
      res.status(200).json({ mensaje: "Eliminado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al borrar" });
    }
  };
}

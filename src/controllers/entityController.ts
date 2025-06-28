import { Request, Response } from "express";

export function crearControladorGenerico(servicio: any, opciones: any) {
  return {
    getAll: async (req: Request, res: Response) => {
      const data = await servicio.getAll();
      res.json(opciones.pasarADto ? data.map(opciones.pasarADto) : data);
    },
    getById: async (req: Request, res: Response) => {
      const entidad = await servicio.getById(req.params.id);

      if (!entidad) {
        res.status(404).send();
      } else {
        res.json(opciones.pasarADto ? opciones.pasarADto(entidad) : entidad);
      }
    },

    create: async (req: Request, res: Response) => {
      const data = opciones.pasarAModelo ? opciones.pasarAModelo(req.body) : req.body;
      const creado = await servicio.create(data);
      res.status(201).json(opciones.pasarADto ? opciones.pasarADto(creado) : creado);
    },
    update: async (req: Request, res: Response) => {
      const data = opciones.pasarAModelo ? opciones.pasarAModelo(req.body) : req.body;
      const actualizado = await servicio.update(req.params.id, data);
      res.json(opciones.pasarADto ? opciones.pasarADto(actualizado) : actualizado);
    },
    remove: async (req: Request, res: Response) => {
      await servicio.remove(req.params.id);
      res.status(204).send();
    },
    browse: async (req: Request, res: Response) => {
      const data = await servicio.browse(req.query);
      res.json(opciones.pasarADto ? data.map(opciones.pasarADto) : data);
    },
    validacionesPost: opciones.validacionesPost ?? []
  };
}

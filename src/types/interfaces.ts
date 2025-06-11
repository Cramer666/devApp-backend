import { Request, Response } from "express";

/*Idea by Eze, me ayudo a hacer todo mas generico...*/

export interface ServicioGenerico {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  add(data: any): Promise<any>;
  remove(id: string): Promise<void>;
  update(id: string, data: any): Promise<any>;
  browse(query?: any): Promise<any[]>;
}

export interface ControladorGenerico {
  getAll: (req: Request, res: Response) => void;
  getById: (req: Request, res: Response) => void;
  add: (req: Request, res: Response) => void;
  remove: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
  browse: (req: Request, res: Response) => void
  validacionesPost?: any[];
}

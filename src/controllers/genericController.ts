import { RequestHandler } from 'express';

export interface ControladorGenerico {
  getAll: RequestHandler;
  getById: RequestHandler;
  create: RequestHandler;
  remove: RequestHandler;
  update: RequestHandler;
  browse: RequestHandler;
  validacionesPost?: RequestHandler[];
}
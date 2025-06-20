import express from "express";
import { ControladorGenerico } from "../controllers/genericController";

//solo hacw las funciones basicas. Las que son de cada entidad la hacen en su router propio...

export function crearRouterGenerico(controlador: ControladorGenerico) {
  const router = express.Router();
  const middlewares = controlador.validacionesPost ?? [];

  router.get("/buscar", controlador.browse);
  router.get("/", controlador.getAll);
  router.get("/:id", controlador.getById);
  router.post("/", ...middlewares, controlador.create);
  router.delete("/:id", controlador.remove);
  router.put("/:id",controlador.update);

  return router;
}

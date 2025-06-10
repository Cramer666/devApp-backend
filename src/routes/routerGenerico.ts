import { Router } from "express";
import { ControladorGenerico } from "../types/interfaces";

//solo hacw las funcines basicas. Las que son de cada entidad la hacen en su router propio...

export function crearRouterGenerico(controlador: ControladorGenerico) {
  const router = Router();

  router.get("/", controlador.getAll);
  router.get("/:id", controlador.getById);
  router.post("/", ...(controlador.validacionesPost || []), controlador.add);
  router.delete("/:id", controlador.remove);
  router.put("/:id",controlador.update);

  return router;
}

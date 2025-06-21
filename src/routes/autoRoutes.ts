import { Router } from "express";
import { crearRouterGenerico } from "./routerGenerico";
import { obtenerRepositorio } from "../repositories/factoryRepo";
import { crearControladorGenerico } from "../controllers/entityController";
import { Auto } from "../models/auto";
import { AutoModel } from "../models/auto";

const routerAuto = Router();

const storage = process.env.STORAGE || "memoria";
const repoAuto = obtenerRepositorio<Auto>(storage, "autos", AutoModel);

const controladorAuto = crearControladorGenerico(repoAuto, {
  pasarADto: (auto: Auto) => auto,
  pasarAModelo: (input: any) => input,
  validacionesPost: []
});

routerAuto.get("/browse", controladorAuto.browse);
// routerAuto.get("/duenios/:id", controladorAutoConExtras.listarDuenos);

const routerGenerico = crearRouterGenerico(controladorAuto);
routerAuto.use(routerGenerico);

export { routerAuto };

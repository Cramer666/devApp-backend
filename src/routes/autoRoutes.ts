import { Router } from "express";
import { controladorAuto } from "../controllers/autoController";

const routerAuto = Router();

routerAuto.get("/", controladorAuto.getAll);
routerAuto.get("/browse", controladorAuto.browse);
routerAuto.get("/:id", controladorAuto.getById);
routerAuto.post("/", controladorAuto.create);
routerAuto.put("/:id", controladorAuto.update);
routerAuto.delete("/:id", controladorAuto.remove);

// Ruta propia
routerAuto.get("/duenios/:id", controladorAuto.listarDuenios);

export default routerAuto;

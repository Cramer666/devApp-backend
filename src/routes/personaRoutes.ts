import { Router } from "express";
import { controladorPersona } from "../controllers/personaController";

const routerPersona = Router();

routerPersona.get("/", controladorPersona.getAll);
routerPersona.get("/browse", controladorPersona.browse);
routerPersona.get("/:id", controladorPersona.getById);
routerPersona.post("/", controladorPersona.create);
routerPersona.put("/:id", controladorPersona.update);
routerPersona.delete("/:id", controladorPersona.remove);

// Ruta propia

routerPersona.get("/autos/:id", controladorPersona.listarAutos);

export default routerPersona;

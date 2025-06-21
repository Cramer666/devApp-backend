import { Router } from "express";
import { crearRouterGenerico } from "./routerGenerico";
import { obtenerRepositorio } from "../repositories/factoryRepo";
import { crearControladorGenerico } from "../controllers/entityController";
import { Persona } from "../models/persona";
import { PersonaModel } from "../models/persona";

const routerPersona = Router();

const storage = process.env.STORAGE || "memoria";
const repoPersona = obtenerRepositorio<Persona>(storage, "personas", PersonaModel);

const controladorPersona = crearControladorGenerico(repoPersona, {
  pasarADto: (persona: Persona) => persona,
  pasarAModelo: (input: any) => input,
  validacionesPost: []
});

/*Rutas propias*/
routerPersona.get("/browse", controladorPersona.browse);
// routerPersona.get("/autos/:id", controladorPersona.listarAutos);
// routerPersona.get("/nombre-apellido/:id", controladorPersona.obtenerNombreyApellido);

const routerGenerico = crearRouterGenerico(controladorPersona);
routerPersona.use(routerGenerico);

export { routerPersona };

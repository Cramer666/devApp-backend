import { Router } from "express";
import { controladorPersona } from "../controllers/personaController";
import { crearRouterGenerico } from "./routerGenerico";

const routerPersona = Router();

/*Rutas propias*/
routerPersona.get("/browse", controladorPersona.browse);
//routerPersona.get("/autos/:id", controladorPersona.listarAutos);

const routerGenerico = crearRouterGenerico(controladorPersona);
routerPersona.use(routerGenerico);

export { routerPersona };

//Tengo q hacer cuando pueda
//routerPersona.get("/nombre-apellido/:id, controladorPersona.obtenerNombreyApellido")
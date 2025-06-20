import { Router } from "express";
import { controladorAuto, controladorAutoConExtras } from "../controllers/autoController";
import { crearRouterGenerico } from "./routerGenerico";

const routerAuto = Router();

//Rutas propias
routerAuto.get("/browse", controladorAuto.browse);
//routerAuto.get("/duenios/:id", controladorAutoConExtras.listarDuenos);

const routerGenerico = crearRouterGenerico(controladorAuto);
routerAuto.use(routerGenerico);

export { routerAuto };


//Hacer si me da el tiempo.
//routerAuto.get('/patente/:patente', controller.buscarPorPatente);
//routerAuto.get('/sin-duenio', controller.autosSinDuenio);
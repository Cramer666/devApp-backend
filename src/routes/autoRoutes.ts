import { Router } from "express";
import { controladorAuto, controladorAutoConExtras } from "../controllers/autoController";
import { crearRouterGenerico } from "./routerGenerico";

const routerAuto = crearRouterGenerico(controladorAuto);
//Ruta propia
routerAuto.get("/duenios/:id", controladorAutoConExtras.listarDuenos);

export { routerAuto };


//Hacer si me da el tiempo.
//routerAuto.get('/patente/:patente', controller.buscarPorPatente);
//routerAuto.get('/sin-duenio', controller.autosSinDuenio);
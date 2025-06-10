import { controladorPersona } from "../controllers/personaController";
import { crearRouterGenerico } from "./routerGenerico";

const routerPersona = crearRouterGenerico(controladorPersona);

/*Ruta propia*/
routerPersona.get("/autos/:id", controladorPersona.listarAutos);

export { routerPersona };

//Tengo q hacer cuando pueda
//routerPersona.get("/nombre-apellido/:id, controladorPersona.obtenerNombreyApellido")
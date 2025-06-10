import { Request, Response, NextFunction } from "express";

/*algunas validaciones, tendria q hacer mas desp*/

export function validarCamposRequeridos(campos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errores = campos.filter(campo => !req.body[campo]);
    if (errores.length > 0) {
      return res.status(400).json({ error: `Faltan campos: ${errores.join(", ")}` });
    }
    next();
  };
}


/*--------------------------------------------------------------------------------------------*/

export function validarAuto(req: Request, res: Response, next: NextFunction): void {
  const { marca, modelo, anio, patente, nroDeChasis, motor } = req.body;

  if (!marca || !modelo || !anio || !patente || !nroDeChasis || !motor) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }
  next();
}


export function validarFormatoPatente(campo: string) {
  return (req: Request, res: Response, next: NextFunction)=> {
    const valor = req.body[campo];
    const regex = /^[A-Z]{2,3}\d{3,4}$/; // Asi como ABC1234...

    if (!regex.test(valor)) {
      res.status(400).json({ error: `El campo ${campo} tiene un formato de patente inválido.` });
      return;
    }

    next();
  };
}

import { Request, Response } from 'express';
import { findPersonaById, editById, addEntity, deleteByID } from '../services/personaService';
import { dataBasic } from '../utilitys/funcionesSecundarias';

export const helloWorld = (req: Request, res: Response): void => {
    console.log(req);
    res.json('Hello world');
};

export const getPersonas = (req: Request, res: Response): void => {
    const resultado = dataBasic();
    console.log(req);
    res.json(resultado);
};

export const getBrowse = (req: Request, res: Response): void => {
    const resultado = dataBasic();
    console.log(req);
    res.json(resultado);
};

export const getPersonaById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const persona = findPersonaById(Number(id));

    if (!persona) {
        res.status(404).json({ error: 'La persona que buscas no existe, 404 bro!' });
    } else {
        res.json(persona);
    }
};

export const editarPersona = (req: Request, res: Response): void => {
    const { id } = req.params;
    const infoPersona = req.body;
    const personaActualizada = editById(Number(id), infoPersona);

    if (personaActualizada === false) {
        res.status(400).json({ error: 'Argumentos incorrectos' });
    } else if (personaActualizada === null) {
        res.status(404).json({ error: 'El ID es incorrecto o no se encuentra' });
    } else {
        res.status(201).json(personaActualizada);
    }
};

export const agregarPersona = (req: Request, res: Response): void => {
    const infoEntidad = req.body;

    try {
        const nuevoId = addEntity(infoEntidad);
        res.status(200).json({ id: nuevoId });
    } catch {
        res.status(400).json({ error: 'Los datos enviados son incorrectos o incompletos' });
    }
};

export const eliminarPersona = (req: Request, res: Response): void => {
    const { id } = req.params;
    const fueEliminada = deleteByID(Number(id));

    if (fueEliminada === false) {
        res.status(404).json({ error: 'ID incorrecto' });
    } else {
        res.status(201).json('Persona eliminada correctamente');
    }
};

export const login = (req: Request, res: Response): void => {
    console.log(req.body);
    res.json('Login Ok');
};

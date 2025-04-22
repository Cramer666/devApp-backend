import { Request, Response } from 'express';
import { PersonaService } from '../services/personaServices';

export class PersonaController {
    constructor(private service: PersonaService) {}

    getAll = (req: Request, res: Response) => {
        res.json(this.service.getAll());
    };

    getById = (req: Request, res: Response) => {
        const persona = this.service.getById(req.params.id);
        if (!persona) {
            res.status(404).json({ error: 'ID no encontrado' });
        }
        res.json(persona);
    };
    create = (req: Request, res: Response) => {
        const newPersona = this.service.create(req.body);
        res.status(201).json(newPersona);
    };

    update = (req: Request, res: Response) => {
        const updatedPersona = this.service.update(req.params.id, req.body);
        if (!updatedPersona) {
            res.status(404).json({ error: 'ID no encontrado' });
        }
        res.json(updatedPersona);
    };

    delete = (req: Request, res: Response) => {
        const repo = this.service.delete(req.params.id);
        if (!repo) res.status(400).json({ error: 'Entidad inválida' });
        res.json({ message: 'Eliminado correctamente' });
    };

    browse = (req: Request, res: Response) => {
        res.json(this.service.browse());
    };
}

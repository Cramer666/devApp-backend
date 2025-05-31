import { Request, Response } from 'express';
import { PersonaService } from '../services/personaServices';

export class PersonaController {
    constructor(private service: PersonaService) {}

    getAll = (req: Request, res: Response) => {
        const result = this.service.getAll();
        res.json(result);
    };

    getById = (req: Request, res: Response) => {
        const result = this.service.getById(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'No encontrado' });
        }
        res.json(result);
    };

    create = (req: Request, res: Response) => {
        try {
            const result = this.service.create(req.body);
            res.status(201).json(result);
        } catch {
            res.status(400).json({ error: 'Error al crear (¿DNI duplicado?)' });
        }
    };

    update = (req: Request, res: Response) => {
        const result = this.service.update(req.params.id, req.body);
        if (!result) {
            return res.status(404).json({ error: 'No encontrado' });
        }
        res.json(result);
    };

    delete = (req: Request, res: Response) => {
        const success = this.service.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'No encontrado' });
        }
        res.json({ message: 'Eliminado correctamente' });
    };

    getNombreApellidoById = (req: Request, res: Response) => {
        const result = this.service.getNombreApellidoById(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'No encontrado' });
        }
        res.json(result);
    };

    browse = (req: Request, res: Response) => {
        res.json(this.service.browse());
    };
}

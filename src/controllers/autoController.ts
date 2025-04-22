import { Request, Response } from 'express';
import { AutoService } from '../services/autoServices';

export class AutoController {
    constructor(private service: AutoService) {}

    getAll = (req: Request, res: Response) => {
        res.json(this.service.getAll());
    };

    getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const auto = await this.service.getById(req.params.id);
            if (!auto) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }
            return res.status(200).json(auto);
        } catch {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    create = (req: Request, res: Response) => {
        const newAuto = this.service.create(req.body);
        res.status(201).json(newAuto);
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const updatedAuto = await this.service.update(req.params.id, req.body);
            if (!updatedAuto) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }
            return res.status(200).json(updatedAuto);
        } catch {
            return res.status(400).json({ error: 'Pasaron cosas...' });
        }
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const isDeleted = await this.service.delete(req.params.id);
            if (!isDeleted) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }
            return res.status(204).send();
        } catch {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    getByPatente = async (req: Request, res: Response): Promise<Response> => {
        try {
            const auto = await this.service.findByPatente(req.params.patente);
            if (!auto) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }
            return res.status(200).json(auto);
        } catch {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    getByDueño = (req: Request, res: Response) => {
        res.json(this.service.findByDueño(req.params.dueñoId));
    };

    browse = (req: Request, res: Response) => {
        res.json(this.service.browse());
    };
}

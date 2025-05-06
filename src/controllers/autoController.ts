import { Request, Response } from 'express';
import { AutoService } from '../services/autoServices';

export class AutoController {
    constructor(private service: AutoService) {}

    getAll = (req: Request, res: Response) => {
        res.json(this.service.getAll());
    };

    getById = async (req: Request, res: Response) => {
        try {
            const auto = await this.service.getById(req.params.id);
            if (!auto) {
                res.status(404).json({ error: 'Auto no encontrado' });
            }
            res.status(200).json(auto);
        } catch {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    create = (req: Request, res: Response) => {
        const newAuto = this.service.create(req.body);
        res.status(201).json(newAuto);
    };

    update = async (req: Request, res: Response) => {
        try {
            const updatedAuto = await this.service.update(req.params.id, req.body);
            if (!updatedAuto) {
                res.status(404).json({ error: 'Auto no encontrado' });
            }
            res.status(200).json(updatedAuto);
        } catch {
            res.status(400).json({ error: 'Pasaron cosas...' });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const isDeleted = await this.service.delete(req.params.id);
            if (!isDeleted) {
                res.status(404).json({ error: 'Auto no encontrado' });
            }
            res.status(204).send();
        } catch {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    getByPatente = async (req: Request, res: Response) => {
        try {
            const auto = await this.service.findByPatente(req.params.patente);
            if (!auto) {
                res.status(404).json({ error: 'Auto no encontrado' });
            }
            res.status(200).json(auto);
        } catch {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    getByDueño = (req: Request, res: Response) => {
        res.json(this.service.findByDueño(req.params.dueñoId));
    };

    browse = (req: Request, res: Response) => {
        res.json(this.service.browse());
    };
}

import { Request, Response } from 'express';
import { AutoService } from '../services/autoServices';
import {pasarAModelo} from '../dtos/autoDto';


export class AutoController {

    constructor(private service: AutoService) {}

    getAll = async (req: Request, res: Response) => {
        const autos = await this.service.getAll();
        res.json(autos);

    };


    getById = async (req: Request, res: Response) => {
        const auto = await this.service.getById(req.params.id);

        if (!auto) res.status(404).json({ error: 'Auto no encontrado' });
        res.json(auto);

    };



    create = async (req: Request, res: Response) => {
        try {
            const autoDto= req.body;
            const auto= pasarAModelo(autoDto);
            const nuevoAuto = this.service.create(auto);
            res.status(201).json(nuevoAuto);
        } catch {
            res.status(400).json({ error: 'Error al crear auto' });
        }
    };


    update = async (req: Request, res: Response) => {
        const autoActualizado = await this.service.update(req.params.id, req.body);
        if (!autoActualizado) res.status(404).json({ error: 'Auto no encontrado' });
        res.json(autoActualizado);
    };


    delete = async (req: Request, res: Response) => {
        const autoEliminado = await this.service.delete(req.params.id);
        if (!autoEliminado) res.status(404).json({ error: 'Auto no encontrado' });
        res.status(204).end();
    };

}


import { Request, Response } from 'express';
import { personaReposiyory } from '../repositories/personaRepository';
import { autoRepository } from '../repositories/autoRepository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const repos: Record<string, any> = {
    persona: personaReposiyory,
    auto: autoRepository,
};

const browse = (req: Request, res: Response) => {
    const repo = repos[req.params.entidad];
    if (!repo) {
        res.status(400).json({ error: 'Entidad inválida' });
    }
    res.json(repo.getAll());
};

const read = (req: Request, res: Response) => {
    const repo = repos[req.params.entidad];
    if (!repo) res.status(400).json({ error: 'Entidad inválida' });
    const id = Number(req.params.id);
    const item = repo.getById(id);
    if (!item) res.status(404).json({ error: 'No encontrado' });
    res.json(item);
};

const add = (req: Request, res: Response) => {
    const repo = repos[req.params.entidad];
    if (!repo) res.status(400).json({ error: 'Entidad inválida' });
    try {
        const id = repo.add(req.body);
        res.status(201).json({ id });
    } catch {
        res.status(400).json({ error: 'Datos inválidos' });
    }
};

const edit = (req: Request, res: Response) => {
    const repo = repos[req.params.entidad];
    if (!repo) res.status(400).json({ error: 'Entidad inválida' });
    const id = Number(req.params.id);
    const result = repo.updateById(id, req.body);
    if (result === null) res.status(404).json({ error: 'No encontrado' });
    if (result === false) res.status(400).json({ error: 'Datos inválidos' });
    res.json(result);
};

const delate = (req: Request, res: Response) => {
    const repo = repos[req.params.entidad];
    if (!repo) res.status(400).json({ error: 'Entidad inválida' });
    const id = Number(req.params.id);
    const deleted = repo.deleteById(id);
    if (!deleted) res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
};

export { browse, read, add, edit, delate };

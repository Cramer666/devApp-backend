import { Router } from 'express';
import { PersonaController } from '../controllers/personaController';
import { PersonaService } from '../services/personaServices';
import { PersonaRepository } from '../repositories/personaRepository';

const router = Router();
const personaRepository = new PersonaRepository();
const service = new PersonaService(personaRepository);
const controller = new PersonaController(service);

router.get('/', controller.getAll);
router.get('/browse', controller.browse);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;

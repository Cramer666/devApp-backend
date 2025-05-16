import { Router } from 'express';
import { PersonaController } from '../controllers/personaController';
import { PersonaService } from '../services/personaServices';
import { personaRepo } from '../repositories/indexRepository';

const router = Router();
const service = new PersonaService(personaRepo);
const controller = new PersonaController(service);

router.get('/', controller.getAll);
router.get('/browse', controller.browse);
router.get('/nombre-apellido/:id', controller.getNombreApellidoById);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;

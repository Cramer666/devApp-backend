import { Router } from 'express';
import { AutoController } from '../controllers/autoController';
import { AutoService } from '../services/autoServices';
import { autoRepo, personaRepo } from '../repositories/indexRepository';

const router = Router();

const service = new AutoService(autoRepo, personaRepo);
const controller = new AutoController(service);

router.get('/', controller.getAll);
router.get('/withOwners', controller.getAllWithOwners);
router.get('/browse', controller.browse);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;

import { Router } from 'express';
import { AutoController } from '../controllers/autoController';
import { AutoService } from '../services/autoServices';

const router = Router();
const service = new AutoService();
const controller = new AutoController(service);

router.get('/', controller.getAll);
router.get('/browse', controller.browse);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;

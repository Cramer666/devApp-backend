import { Router } from 'express';
import { AutoController } from '../controllers/autoController';
import { AutoService } from '../services/autoServices';


const router = Router();
const autoService = new AutoService();
const autoController = new AutoController(autoService);


router.get('/', autoController.getAll);
router.get('/:id', autoController.getById);
router.post('/', autoController.create);
router.put('/:id', autoController.update);
router.delete('/:id', autoController.delete);

export default router;


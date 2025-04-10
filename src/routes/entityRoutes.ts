import { Router } from 'express';
import { browse, read, add, edit, delate } from '../controllers/entityController';

const router = Router();

router.get('/:entidad', browse);
router.get('/:entidad/:id', read);
router.post('/:entidad', add);
router.put('/:entidad/:id', edit);
router.delete('/:entidad/:id', delate);

export default router;

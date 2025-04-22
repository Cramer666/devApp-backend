import { Router } from 'express';
import personaRoutes from './personaRoutes';
import autoRoutes from './autoRoutes';

const router = Router();

router.use('/personas', personaRoutes);
router.use('/autos', autoRoutes);

export default router;

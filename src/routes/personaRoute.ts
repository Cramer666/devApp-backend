import { Router } from 'express';
import {
    helloWorld,
    getPersonas,
    getBrowse,
    getPersonaById,
    editarPersona,
    agregarPersona,
    eliminarPersona,
    login,
} from '../controllers/personaController';

const router = Router();

router.get('/', helloWorld);
router.get('/personas', getPersonas);
router.get('/browse', getBrowse);
router.get('/read/:id', getPersonaById);
router.put('/edit/:id', editarPersona);
router.post('/add', agregarPersona);
router.delete('/delete/:id', eliminarPersona);
router.post('/login', login);

export default router;

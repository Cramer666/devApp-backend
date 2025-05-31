import { Router } from 'express';
import { PersonaController } from '../controllers/personaController';
import { PersonaService } from '../services/personaServices';
import { personaRepo } from '../repositories/indexRepository';

const router: Router = Router(); // Tipo explícito Router
const service = new PersonaService(personaRepo);
const controller = new PersonaController(service);

// Configuración de rutas corregida
router.get('/', (req, res) => {
    controller.getAll(req, res);
});

router.get('/browse', (req, res) => {
    controller.browse(req, res);
});

router.get('/nombre-apellido/:id', (req, res) => {
    controller.getNombreApellidoById(req, res);
});

router.get('/:id', (req, res) => {
    controller.getById(req, res);
});

router.post('/', (req, res) => {
    controller.create(req, res);
});

router.put('/:id', (req, res) => {
    controller.update(req, res);
});

router.delete('/:id', (req, res) => {
    controller.delete(req, res);
});

export default router;

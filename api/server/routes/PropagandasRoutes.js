import { Router } from 'express';
import PropagandaController from '../controllers/PropagandaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',PropagandaController.lista)
router.get('/lista',PropagandaController.listas)
router.get('/:id',PropagandaController.item)
router.post('/', PropagandaController.add);
router.put('/:id', PropagandaController.update);
router.delete('/:id', PropagandaController.delete);

export default router;

import { Router } from 'express';
import UbicacionController from '../controllers/UbicacionController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',UbicacionController.lista)
router.get('/lista',UbicacionController.listas)
router.get('/:id',UbicacionController.item)
router.post('/', UbicacionController.add);
router.put('/:id', UbicacionController.update);
router.delete('/:id', UbicacionController.delete);

export default router;

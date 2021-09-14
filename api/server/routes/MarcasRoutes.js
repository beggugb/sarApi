import { Router } from 'express';
import MarcaController from '../controllers/MarcaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',MarcaController.lista)
router.get('/lista',MarcaController.listas)
router.get('/:id',MarcaController.item)
router.post('/', MarcaController.add);
router.put('/:id', MarcaController.update);
router.delete('/:id', MarcaController.delete);

export default router;

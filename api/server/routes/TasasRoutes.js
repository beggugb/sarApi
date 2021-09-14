import { Router } from 'express';
import TasaController from '../controllers/TasaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',TasaController.lista)
router.get('/lista',TasaController.listas)
router.get('/:id',TasaController.item)
router.post('/', TasaController.add);
router.put('/:id', TasaController.update);
router.delete('/:id', TasaController.delete);
router.get('/listadetalle/:id',TasaController.listadetalle)
export default router;

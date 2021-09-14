import { Router } from 'express';
import PclausulasController from '../controllers/PclausulasController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',PclausulasController.lista)
router.get('/lista',PclausulasController.listas)
router.get('/:id',PclausulasController.item)
router.post('/', PclausulasController.add);
router.put('/:id', PclausulasController.update);
router.delete('/:id', PclausulasController.delete);
router.get('/listadetalle/:id',PclausulasController.listadetalle)
export default router;

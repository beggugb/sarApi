import { Router } from 'express';
import ClausulaProductosController from '../controllers/ClausulaProductosController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',ClausulaProductosController.lista)
router.get('/lista',ClausulaProductosController.listas)
router.get('/:id',ClausulaProductosController.item)
router.post('/', ClausulaProductosController.add);
router.put('/:id', ClausulaProductosController.update);
router.delete('/:id', ClausulaProductosController.delete);
router.get('/listadetalle/:id', ClausulaProductosController.listadetalle)
export default router;

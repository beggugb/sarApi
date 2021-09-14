import { Router } from 'express';
import CoberturaProductosController from '../controllers/CoberturaProductosController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',CoberturaProductosController.lista)
router.get('/lista',CoberturaProductosController.listas)
router.get('/:id',CoberturaProductosController.item)
router.post('/', CoberturaProductosController.add);
router.put('/:id', CoberturaProductosController.update);
router.delete('/:id', CoberturaProductosController.delete);

export default router;

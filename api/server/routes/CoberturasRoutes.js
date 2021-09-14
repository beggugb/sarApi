import { Router } from 'express';
import CoberturaController from '../controllers/CoberturaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',CoberturaController.lista)
router.get('/lista',CoberturaController.listas)
router.get('/:id',CoberturaController.item)
router.post('/', CoberturaController.add);
router.put('/:id', CoberturaController.update);
router.delete('/:id', CoberturaController.delete);
router.get('/lista/items',CoberturaController.listas)
export default router;

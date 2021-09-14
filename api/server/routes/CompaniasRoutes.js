import { Router } from 'express';
import CompaniaController from '../controllers/CompaniaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',CompaniaController.lista)
router.get('/:id',CompaniaController.item)
router.post('/registro', CompaniaController.registro);
router.post('/', CompaniaController.add);
router.put('/:id', CompaniaController.update);
router.delete('/:id', CompaniaController.delete);
router.get('/lista/items',CompaniaController.listas)
export default router;

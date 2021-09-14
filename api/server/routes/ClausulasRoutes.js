import { Router } from 'express';
import ClausulaController from '../controllers/ClausulaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',ClausulaController.lista)
/*router.get('/lista',ClausulaController.listas)*/
router.get('/:id',ClausulaController.item)
router.post('/', ClausulaController.add);
router.put('/:id', ClausulaController.update);
router.delete('/:id', ClausulaController.delete);
router.get('/lista/items',ClausulaController.listas)
export default router;

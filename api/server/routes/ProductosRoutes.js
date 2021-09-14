import { Router } from 'express';
import ProductoController from '../controllers/ProductoController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',ProductoController.lista)
router.get('/lista',ProductoController.listas)
router.get('/:id',ProductoController.item)
router.post('/', ProductoController.add);
router.put('/:id', ProductoController.update);
router.delete('/:id', ProductoController.delete);
router.get('/listadetalle/:id',ProductoController.listadetalle)
router.post('/search',ProductoController.search);
export default router;

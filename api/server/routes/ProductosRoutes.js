import { Router } from 'express';
import ProductoController from '../controllers/ProductoController';

const router = Router();

router.get('/data/:page/:num/:prop/:orden',ProductoController.getData)
router.get('/list/:prop/:value', ProductoController.getList);
router.get('/items/:prop/:value', ProductoController.getItems);
router.get('/:id',ProductoController.getItem)
router.post('/:tipo', ProductoController.setAdd);
router.put('/:id/:tipo', ProductoController.setUpdate);
router.delete('/:id/:tipo', ProductoController.getDelete);
router.get('/listadetalle/:id',ProductoController.getListadetalle)

/*router.get('/listas/:page/:num/:prop/:orden',ProductoController.lista)
router.get('/lista',ProductoController.listas)
router.get('/:id',ProductoController.item)
router.post('/', ProductoController.add);
router.put('/:id', ProductoController.update);
router.delete('/:id', ProductoController.delete);
router.get('/listadetalle/:id',ProductoController.listadetalle)
router.post('/search',ProductoController.search);*/
export default router;

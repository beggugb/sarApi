import { Router } from 'express';
import ModeloController from '../controllers/ModeloController';

const router = Router();

router.get('/data/:page/:num/:prop/:orden',ModeloController.getData)
router.get('/list/:prop/:value', ModeloController.getList);
router.get('/items/:prop/:value', ModeloController.getItems);
router.get('/:id',ModeloController.getItem)
router.post('/:tipo', ModeloController.setAdd);
router.put('/:id/:tipo', ModeloController.setUpdate);
router.delete('/:id/:tipo', ModeloController.getDelete);
router.get('/listadetalles/:id/:tipo',ModeloController.listadetalle)

/*router.get('/listas/:page/:num/:prop/:orden',ModeloController.lista)
router.get('/lista',ModeloController.listas)
router.get('/:id',ModeloController.item)
router.post('/registro', ModeloController.add);
router.put('/:id', ModeloController.update);
router.delete('/:id', ModeloController.delete);
router.get('/listasdetalle/:id/:tipo',ModeloController.listadetalle)*/




export default router;

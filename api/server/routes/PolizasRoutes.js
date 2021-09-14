import { Router } from 'express';
import PolizasController from '../controllers/PolizasController';

const router = Router();
router.post('/registro', PolizasController.registro);
router.get('/:id',PolizasController.item);
router.get('/listas/:usuarioId/:rolId/:page/:num',PolizasController.lista)
router.post('/search',PolizasController.search);
/*router.get('/:id',PolizaController.item)
router.post('/registro', PolizaController.registro);
router.post('/', PolizaController.add);
router.put('/:id', PolizaController.update);
router.delete('/:id', PolizaController.delete);
router.post('/search',PolizaController.search);
router.get('/listadetalle/:nombre',PolizaController.buscar)
router.put('/mobil/:id', PolizaController.updates);*/
export default router;

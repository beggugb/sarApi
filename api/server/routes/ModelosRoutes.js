import { Router } from 'express';
import ModeloController from '../controllers/ModeloController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',ModeloController.lista)
router.get('/lista',ModeloController.listas)
router.get('/:id',ModeloController.item)
router.post('/registro', ModeloController.add);
router.put('/:id', ModeloController.update);
router.delete('/:id', ModeloController.delete);
router.get('/listasdetalle/:id/:tipo',ModeloController.listadetalle)
export default router;

import { Router } from 'express';
import TipoController from '../controllers/TipoController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',TipoController.lista)
router.get('/lista',TipoController.listas)
router.get('/:id',TipoController.item)
router.post('/', TipoController.add);
router.put('/:id', TipoController.update);
router.delete('/:id', TipoController.delete);
/*router.get('/listadetalle/:id', TipoController.listadetalle)*/
export default router;

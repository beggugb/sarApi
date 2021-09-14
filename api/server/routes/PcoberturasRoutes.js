import { Router } from 'express';
import PcoberturasController from '../controllers/PcoberturasController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',PcoberturasController.lista)
router.get('/lista',PcoberturasController.listas)
router.get('/:id',PcoberturasController.item)
router.post('/', PcoberturasController.add);
router.put('/:id', PcoberturasController.update);
router.delete('/:id', PcoberturasController.delete);
router.get('/listadetalle/:id',PcoberturasController.listadetalle)
export default router;

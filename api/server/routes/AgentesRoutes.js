import { Router } from 'express';
import AgenteController from '../controllers/AgenteController';
import WhatsAppController from '../controllers/WhatsAppController'
const router = Router();
router.get('/listas/:page/:num/:prop/:orden',AgenteController.lista)
router.post('/registro', AgenteController.add);
router.put('/:id', AgenteController.update);
router.post('/search',AgenteController.search)
router.get('/formula/item/:rango/:potencia',AgenteController.formula)
/*router.get('/:id',ClienteController.item)
router.post('/registro', ClienteController.registro);
router.post('/', ClienteController.add);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);
router.post('/search',ClienteController.search);*/
export default router;

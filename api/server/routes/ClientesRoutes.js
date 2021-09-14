import KeyToken from './keyToken'
import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const router = Router();
router.post('/mobil/login/',ClienteController.loginmobil);

router.get('/listas/:page/:num/:prop/:orden',ClienteController.lista)
router.get('/:id',ClienteController.item)
router.post('/registro',ClienteController.registro);
router.post('/',ClienteController.add);
router.put('/:id',ClienteController.update);
router.delete('/:id',ClienteController.delete);
router.post('/search',ClienteController.search);
router.get('/listadetalle/:nombre',ClienteController.buscar)
router.put('/mobil/:id',ClienteController.updates);
router.get('/mobil/:id',ClienteController.mitem);

export default router;

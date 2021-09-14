import KeyTokens from './keyTokens'
import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const router = Router();
router.post('/mobil/login/',ClienteController.loginmobil);

router.get('/listas/:page/:num/:prop/:orden',KeyTokens,ClienteController.lista)
router.get('/:id',KeyTokens,ClienteController.item)
router.post('/registro',KeyTokens,ClienteController.registro);
router.post('/',KeyTokens,ClienteController.add);
router.put('/:id',KeyTokens,ClienteController.update);
router.delete('/:id',KeyTokens,ClienteController.delete);
router.post('/search',KeyTokens,ClienteController.search);
router.get('/listadetalle/:nombre',KeyTokens,ClienteController.buscar)
router.put('/mobil/:id',KeyTokens,ClienteController.updates);
router.get('/mobil/:id',KeyTokens,ClienteController.mitem);

export default router;

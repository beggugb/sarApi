import KeyTokens from './keyTokens'
import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const router = Router();
/*mobil*/
router.post('/mobil/login/',ClienteController.getLogin);
router.get('/mobil/:id',ClienteController.getMobilItem);
router.put('/mobil/:id/:tipo',ClienteController.setUpdateMobil);

/*fijo*/
router.get('/data/:page/:num/:prop/:orden',ClienteController.getData);
router.get('/list/:prop/:value', ClienteController.getList);
router.get('/items/:prop/:value', ClienteController.getItems);
router.get('/:id',ClienteController.getItem);
router.post('/:tipo',ClienteController.setAdd);
router.put('/:id/:tipo',ClienteController.setUpdate);
router.delete('/:id/:tipo',ClienteController.getDelete);
router.post('/search/lista',ClienteController.getSearch);
router.get('/listadetalle/:nombre',ClienteController.buscar)




export default router;

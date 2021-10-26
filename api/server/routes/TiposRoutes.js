import { Router } from 'express';
import TipoController from '../controllers/TipoController';

const router = Router();
router.get('/data/:page/:num/:prop/:orden',TipoController.getData)
router.get('/list/:prop/:value', TipoController.getList);
router.get('/items/:prop/:value', TipoController.getItems);
router.get('/:id',TipoController.getItem)
router.post('/:tipo', TipoController.setAdd);
router.put('/:id/:tipo', TipoController.setUpdate);
router.delete('/:id/:tipo', TipoController.getDelete);


export default router;

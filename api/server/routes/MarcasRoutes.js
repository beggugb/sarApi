import { Router } from 'express';
import MarcaController from '../controllers/MarcaController';

const router = Router();

router.get('/data/:page/:num/:prop/:orden',MarcaController.getData)
router.get('/list/:prop/:value', MarcaController.getList);
router.get('/items/:prop/:value', MarcaController.getItems);
router.get('/:id',MarcaController.getItem)
router.post('/:tipo', MarcaController.setAdd);
router.put('/:id/:tipo', MarcaController.setUpdate);
router.delete('/:id/:tipo', MarcaController.getDelete);


export default router;

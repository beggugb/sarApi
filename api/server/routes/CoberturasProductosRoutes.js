import { Router } from 'express';
import CoberturaProductosController from '../controllers/CoberturaProductosController';

const router = Router();
router.get('/data/:id',CoberturaProductosController.getData)
router.get('/list/:prop/:value', CoberturaProductosController.getList);
router.get('/:id',CoberturaProductosController.getItem)
router.post('/:tipo', CoberturaProductosController.setAdd);
router.put('/:id/:tipo', CoberturaProductosController.setUpdate);
router.delete('/:id/:tipo', CoberturaProductosController.getDelete);

export default router;

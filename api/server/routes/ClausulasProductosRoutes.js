import { Router } from 'express';
import ClausulaProductosController from '../controllers/ClausulaProductosController';

const router = Router();

router.get('/list/:prop/:value', ClausulaProductosController.getList)
router.get('/:id',ClausulaProductosController.getItem);
router.post('/:tipo',ClausulaProductosController.setAdd);

export default router;

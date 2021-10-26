import { Router } from 'express';
import CatalogoController from '../controllers/CatalogoController';

const router = Router();
router.get('/:id',CatalogoController.getItem);
router.post('/:tipo', CatalogoController.setAdd);
router.put('/:id/:tipo',CatalogoController.setUpdate);
export default router;

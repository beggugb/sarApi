import { Router } from 'express';
import CatalogoController from '../controllers/CatalogoController';

const router = Router();
router.post('/', CatalogoController.add);
router.get('/:id',CatalogoController.item)
router.put('/:id',CatalogoController.update)
export default router;

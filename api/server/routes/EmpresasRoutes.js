import { Router } from 'express';
import EmpresaController from '../controllers/EmpresaController';

const router = Router();
router.put('/:id', EmpresaController.update);
router.get('/:id', EmpresaController.item);
export default router;

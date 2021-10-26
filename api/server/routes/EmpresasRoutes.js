import { Router } from 'express';
import EmpresaController from '../controllers/EmpresaController';

const router = Router();
router.get('/:id',EmpresaController.getItem)
router.put('/:id/:tipo', EmpresaController.setUpdate);
export default router;

import { Router } from 'express';
import NotaController from '../controllers/NotaController';

const router = Router();
router.post('/', NotaController.add);
export default router;

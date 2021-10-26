import { Router } from 'express';
import NotaController from '../controllers/NotaController';

const router = Router();
router.post('/:tipo', NotaController.setAdd);
router.get('/data/:page/:num/:prop/:orden',NotaController.getData);
router.get('/moras/data/:page/:num/:prop/:orden',NotaController.getDataMoras);
export default router;

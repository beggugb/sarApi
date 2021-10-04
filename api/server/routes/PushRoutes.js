import { Router } from 'express';
import PushController from '../controllers/PushController';

const router = Router();
router.get('/mobil/cotizaciones/:page/:num/:id', PushController.mensajes);
export default router;

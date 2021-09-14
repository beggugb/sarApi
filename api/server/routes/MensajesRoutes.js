import { Router } from 'express';
import MensajeController from '../controllers/MensajeController';

const router = Router();
router.post('/send',MensajeController.sendMessajeUnit)
export default router;


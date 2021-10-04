import { Router } from 'express';
import SiniestrosController from '../controllers/SiniestrosController';

const router = Router();
router.post('/',SiniestrosController.add)

export default router;

import { Router } from 'express';
import PushController from '../controllers/PushController';

const router = Router();
router.get('/mensajes/:templateId', PushController.enviar)
router.get('/moras', PushController.moras)

/*router.get('/mobil/cotizaciones/:page/:num/:id', PushController.mensajes);
router.post('/mobil/mensaje', PushController.enviar)*/
export default router;

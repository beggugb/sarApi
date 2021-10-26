import { Router } from 'express';
import MensajeController from '../controllers/MensajeController';

const router = Router();

router.get('/mobil/data/:page/:num/:usuarioId/:propId',MensajeController.getDataMobil);
router.get('/mobils/data/:page/:num/:usuarioId/:propId',MensajeController.getDataMobils);

/*router.post('/send',MensajeController.sendMessajeUnit)*/
router.get('/data/:page/:num/:prop/:orden',MensajeController.getData);
router.get('/list/:prop/:value', MensajeController.getList);
router.get('/items/:prop/:value', MensajeController.getItems);
router.get('/:id',MensajeController.getItem);
router.post('/:tipo',MensajeController.setAdd);
router.put('/:id/:tipo',MensajeController.setUpdate);
router.delete('/:id/:tipo',MensajeController.getDelete);
router.post('/search/lista',MensajeController.getSearch);
export default router;


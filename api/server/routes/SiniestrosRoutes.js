import { Router } from 'express';
import SiniestroController from '../controllers/SiniestroController';

const router = Router();

/*mobil*/
/*router.post('/mobil/login/',SiniestroController.getLogin);
router.get('/mobil/:id',SiniestroController.getMobilItem);
router.put('/mobil/:id/:tipo',SiniestroController.setUpdate);*/
router.get('/mobil/data/:page/:num/:usuarioId/:propId',SiniestroController.getDataMobil);

/*fijo*/
router.get('/data/:page/:num/:prop/:orden',SiniestroController.getData);
router.get('/list/:prop/:value', SiniestroController.getList);
router.get('/items/:prop/:value', SiniestroController.getItems);
router.get('/:id',SiniestroController.getItem);
router.post('/:tipo',SiniestroController.setAdd);
router.put('/:id/:tipo',SiniestroController.setUpdate);
router.delete('/:id/:tipo',SiniestroController.getDelete);
router.post('/search/lista',SiniestroController.getSearch);


export default router;

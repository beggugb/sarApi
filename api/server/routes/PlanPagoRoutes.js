import KeyTokens from './keyTokens'
import { Router } from 'express';
import PlanPagoController from '../controllers/PlanPagoController';

const router = Router();
router.get('/data/:page/:num/:prop/:orden',PlanPagoController.getData);
router.get('/moras/data/:page/:num/:prop/:orden',PlanPagoController.getDataMoras);
router.get('/list/:prop/:value', PlanPagoController.getList);
router.get('/items/:prop/:value', PlanPagoController.getItems);
router.get('/:id',PlanPagoController.getItem);
router.post('/:tipo',PlanPagoController.setAdd);
router.put('/:id/:tipo',PlanPagoController.setUpdate);
router.delete('/:id/:tipo',PlanPagoController.getDelete);
router.post('/search/lista',PlanPagoController.getSearch);
router.get('/listadetalle/:nombre',PlanPagoController.buscar)




export default router;

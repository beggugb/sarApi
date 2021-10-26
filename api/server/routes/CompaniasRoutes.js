import { Router } from 'express';
import CompaniaController from '../controllers/CompaniaController';

const router = Router();
router.get('/data/:page/:num/:prop/:orden',CompaniaController.getData);
router.get('/list/:prop/:value', CompaniaController.getList);
router.get('/items/:prop/:value', CompaniaController.getItems);
router.get('/:id',CompaniaController.getItem);
router.post('/:tipo',CompaniaController.setAdd);
router.put('/:id/:tipo',CompaniaController.setUpdate);
router.delete('/:id/:tipo',CompaniaController.getDelete);
router.post('/search/lista',CompaniaController.getSearch);
export default router;

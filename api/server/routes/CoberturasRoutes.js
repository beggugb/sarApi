import { Router } from 'express';
import CoberturaController from '../controllers/CoberturaController';

const router = Router();

router.get('/data/:page/:num/:prop/:orden',CoberturaController.getData);
router.get('/list/:prop/:value', CoberturaController.getList);
router.get('/items/:prop/:value', CoberturaController.getItems);
router.get('/:id',CoberturaController.getItem);
router.post('/:tipo',CoberturaController.setAdd);
router.put('/:id/:tipo',CoberturaController.setUpdate);
router.delete('/:id/:tipo',CoberturaController.getDelete);
router.post('/search/lista',CoberturaController.getSearch);

export default router;

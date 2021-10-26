import { Router } from 'express';
import ClausulaController from '../controllers/ClausulaController';

const router = Router();

router.get('/data/:page/:num/:prop/:orden',ClausulaController.getData);
router.get('/list/:prop/:value', ClausulaController.getList);
router.get('/items/:prop/:value', ClausulaController.getItems);
router.get('/:id',ClausulaController.getItem);
router.post('/:tipo',ClausulaController.setAdd);
router.put('/:id/:tipo',ClausulaController.setUpdate);
router.delete('/:id/:tipo',ClausulaController.getDelete);
router.post('/search/lista',ClausulaController.getSearch);

export default router;

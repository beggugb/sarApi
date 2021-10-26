import { Router } from 'express';
import RamoController from '../controllers/RamoController';

const router = Router();

router.get('/data/:page/:num/:prop/:orden',RamoController.getData)
router.get('/list/:prop/:value', RamoController.getList);
router.get('/items/:prop/:value', RamoController.getItems);
router.get('/:id',RamoController.getItem)
router.post('/:tipo', RamoController.setAdd);
router.put('/:id/:tipo', RamoController.setUpdate);
router.delete('/:id/:tipo', RamoController.getDelete);


/*
router.get('/listas/:page/:num/:prop/:orden',RamoController.lista)
router.get('/lista',RamoController.listas)
router.get('/:id',RamoController.item)
router.post('/', RamoController.add);
router.put('/:id', RamoController.update);
router.delete('/:id', RamoController.delete);
*/
export default router;

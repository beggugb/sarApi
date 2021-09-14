import { Router } from 'express';
import RamoController from '../controllers/RamoController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',RamoController.lista)
router.get('/lista',RamoController.listas)
router.get('/:id',RamoController.item)
router.post('/', RamoController.add);
router.put('/:id', RamoController.update);
router.delete('/:id', RamoController.delete);

export default router;

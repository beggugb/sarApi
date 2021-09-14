import { Router } from 'express';
import FilesController from '../controllers/FilesController';

const router = Router();
router.put('/cliente/item/:id', FilesController.cliente);
router.put('/compania/item/:id', FilesController.compania);
router.put('/empresa/item/:id', FilesController.empresa);
router.put('/modelo/item/:id', FilesController.modelo);
router.put('/agente/item/:id', FilesController.agente);
export default router;

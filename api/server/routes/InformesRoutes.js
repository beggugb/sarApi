import { Router } from 'express';
import InformesController from '../controllers/InformesController';

const router = Router();
router.post('/clientes',InformesController.clientes)
router.post('/cotizaciones',InformesController.cotizaciones)
router.post('/polizas',InformesController.polizas)
router.post('/comisiones',InformesController.comisiones)
router.post('/agentes',InformesController.agentes)
router.get('/campanas',InformesController.campanas)
router.post('/dashboard',InformesController.dashboard)
export default router;

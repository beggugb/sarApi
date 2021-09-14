import { Router } from 'express';
import CotizacionesController from '../controllers/CotizacionesController';

const router = Router();
router.get('/listas/:usuarioId/:rolId/:page/:num',CotizacionesController.lista)
router.post('/cotizar', CotizacionesController.cotizar);
router.post('/', CotizacionesController.add);
router.get('/:id', CotizacionesController.item);
router.get('/enviar/cotizacion/:id', CotizacionesController.enviar);
router.post('/search',CotizacionesController.search);
router.post('/mobil/cotizar', CotizacionesController.cotizars);
router.get('/crear/cotizacion/poliza/:id', CotizacionesController.poliza);
router.get('/mobil/cotizaciones/:page/:num/:id', CotizacionesController.cotizaciones);
export default router;

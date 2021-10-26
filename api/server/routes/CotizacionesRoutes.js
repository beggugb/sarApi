import { Router } from 'express';
import CotizacionesController from '../controllers/CotizacionesController';

const router = Router();
/** WebLocal */
router.get('/data/:page/:num/:prop/:orden',CotizacionesController.getData)
router.get('/:id', CotizacionesController.getItem);
router.post('/cotizar', CotizacionesController.getCotizar)
router.post('/:tipo', CotizacionesController.setAdd);
router.get('/enviar/cotizacion/:id', CotizacionesController.enviar);
router.post('/search/lista',CotizacionesController.getSearch);
/** Mobil */
router.get('/mobil/data/:page/:num/:prop/:orden', CotizacionesController.getDataMobil);
router.post('/mobil/cotizar', CotizacionesController.getCotizarMobil)





/*router.post('/cotizar', CotizacionesController.cotizar);
router.post('/', CotizacionesController.add);
router.get('/:id', CotizacionesController.item);
router.get('/enviar/cotizacion/:id', CotizacionesController.enviar);
router.post('/search',CotizacionesController.search);
router.post('/mobil/cotizar', CotizacionesController.cotizars);
router.get('/crear/cotizacion/poliza/:id', CotizacionesController.poliza);
router.get('/mobil/cotizaciones/:page/:num/:id', CotizacionesController.cotizaciones);*/
export default router;

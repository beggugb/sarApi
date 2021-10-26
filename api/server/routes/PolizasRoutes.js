import { Router } from 'express';
import PolizasController from '../controllers/PolizasController';

const router = Router();

/** WebLocal */
router.get('/data/:page/:num/:prop/:orden',PolizasController.getData)
router.post('/:tipo', PolizasController.setAdd);
router.get('/:id', PolizasController.getItem);
/*router.post('/cotizar', PolizasController.getCotizar)
router.get('/enviar/cotizacion/:id', PolizasController.enviar);
router.post('/search/lista',PolizasController.getSearch);*/


/** 
router.post('/registro', PolizasController.registro);
router.get('/:id',PolizasController.item);
router.get('/listas/:usuarioId/:rolId/:page/:num',PolizasController.lista)
router.post('/search',PolizasController.search);

*/

export default router;

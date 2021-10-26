import KeyTokens from './keyTokens'
import { Router } from 'express';
import TicketController from '../controllers/TicketController';

const router = Router();
/*fijo*/
router.get('/data/:page/:num/:prop/:orden',TicketController.getData);
router.get('/list/:prop/:value', TicketController.getList);
router.get('/items/:prop/:value', TicketController.getItems);
router.get('/:id',TicketController.getItem);
router.post('/:tipo',TicketController.setAdd);
router.put('/:id/:tipo',TicketController.setUpdate);
router.delete('/:id/:tipo',TicketController.getDelete);
router.post('/search/lista',TicketController.getSearch);
router.get('/listadetalle/:nombre',TicketController.buscar)

export default router;

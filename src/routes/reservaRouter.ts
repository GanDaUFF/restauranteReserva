import { Router } from 'express';
import { criarReserva } from '../controllers/criarReservaController';
import { listarReservas } from '../controllers/listarReservaController';
import { deletarReserva } from '../controllers/deletarReservaController';
import { atualizarReserva } from '../controllers/atualizarReservaController';

const router = Router();

router.post('/criarReserva', criarReserva);
router.get('/listarReservas', listarReservas);
router.delete('/deletarReserva/:id', deletarReserva)
router.put('/atualizarReserva/:id', atualizarReserva);

export default router;
